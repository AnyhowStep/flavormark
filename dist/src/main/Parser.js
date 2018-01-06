"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./Constants");
const TextParser_1 = require("./TextParser");
class Parser {
    constructor(blockParsers, inlineParser, options) {
        this.currentLine = "";
        this.lineNumber = 0;
        this.offset = 0;
        this.column = 0;
        this.nextNonspace = 0;
        this.nextNonspaceColumn = 0;
        this.indent = 0;
        this.indented = false;
        this.blank = false;
        this.partiallyConsumedTab = false;
        this.allClosed = true;
        this.lastLineLength = 0;
        const textParser = new TextParser_1.TextParser();
        if (!blockParsers.has(textParser.getNodeType())) {
            blockParsers.add(textParser);
        }
        this.inlineParser = inlineParser;
        this.options = options || {};
        this.blockParsers = blockParsers;
        //TODO, delete this safely?
        this.doc = blockParsers.instantiateDocument({
            start: {
                row: 1,
                column: 1,
            },
            end: {
                row: 0,
                column: 0,
            },
        });
        this.tip = this.doc;
        this.oldtip = this.doc;
        this.lastMatchedContainer = this.doc;
    }
    // Add a line to the block at the tip.  We assume the tip
    // can accept lines -- that check should be done before calling this.
    addLine() {
        if (this.tip == undefined) {
            throw new Error("this.tip cannot be undefined");
        }
        const p = this.getBlockParser(this.tip);
        if (!p.acceptsLines) {
            throw new Error(`Cannot add line to ${this.tip.type}; it does not accept lines`);
        }
        if (this.partiallyConsumedTab) {
            this.offset += 1; // skip over tab
            // add space characters:
            var charsToTab = Constants_1.INDENT_LENGTH - (this.column % Constants_1.INDENT_LENGTH);
            p.appendString(this.tip, ' '.repeat(charsToTab));
        }
        p.appendString(this.tip, this.currentLine.slice(this.offset) + '\n');
    }
    ;
    // Add block of type tag as a child of the tip.  If the tip can't
    // accept children, close and finalize it and try its parent,
    // and so on til we find a block that can accept children.
    addChild(blockParser, offset) {
        if (this.tip == undefined) {
            throw new Error("this.tip cannot be undefined");
        }
        const ctor = blockParser.getNodeCtor();
        var column_number = offset + 1; // offset 0 = column 1
        const tag = blockParser.getNodeType();
        var newBlock = new ctor(tag, {
            start: {
                row: this.lineNumber,
                column: column_number,
            },
            end: {
                row: 0,
                column: 0,
            },
        });
        while (!this.blockParsers.get(this.tip).canContain(blockParser, newBlock) ||
            !blockParser.canBeContainedBy(this.blockParsers.get(this.tip), this.tip)) {
            this.finalize(this.tip, this.lineNumber - 1);
        }
        this.tip.appendChild(newBlock);
        this.tip = newBlock;
        return newBlock;
    }
    ;
    // Finalize and close any unmatched blocks.
    closeUnmatchedBlocks() {
        if (!this.allClosed) {
            // finalize any blocks not matched
            while (this.oldtip !== this.lastMatchedContainer) {
                if (this.oldtip == undefined) {
                    throw new Error("this.oldtip cannot be undefined");
                }
                var parent = this.oldtip.getParent();
                this.finalize(this.oldtip, this.lineNumber - 1);
                if (parent == undefined) {
                    throw new Error("parent cannot be undefined");
                }
                this.oldtip = parent;
            }
            this.allClosed = true;
        }
    }
    ;
    advanceOffset(count, columns) {
        var currentLine = this.currentLine;
        var charsToTab, charsToAdvance;
        var c;
        while (count > 0 && (c = currentLine[this.offset])) {
            if (c === '\t') {
                charsToTab = Constants_1.INDENT_LENGTH - (this.column % Constants_1.INDENT_LENGTH);
                if (columns) {
                    this.partiallyConsumedTab = charsToTab > count;
                    charsToAdvance = charsToTab > count ? count : charsToTab;
                    this.column += charsToAdvance;
                    this.offset += this.partiallyConsumedTab ? 0 : 1;
                    count -= charsToAdvance;
                }
                else {
                    this.partiallyConsumedTab = false;
                    this.column += charsToTab;
                    this.offset += 1;
                    count -= 1;
                }
            }
            else {
                this.partiallyConsumedTab = false;
                this.offset += 1;
                this.column += 1; // assume ascii; block starts are ascii
                count -= 1;
            }
        }
    }
    ;
    advanceNextNonspace() {
        this.offset = this.nextNonspace;
        this.column = this.nextNonspaceColumn;
        this.partiallyConsumedTab = false;
    }
    ;
    findNextNonspace() {
        var currentLine = this.currentLine;
        var i = this.offset;
        var cols = this.column;
        var c;
        while ((c = currentLine.charAt(i)) !== '') {
            if (c === ' ') {
                i++;
                cols++;
            }
            else if (c === '\t') {
                i++;
                cols += (Constants_1.INDENT_LENGTH - (cols % Constants_1.INDENT_LENGTH));
            }
            else {
                break;
            }
        }
        this.blank = (c === '\n' || c === '\r' || c === '');
        this.nextNonspace = i;
        this.nextNonspaceColumn = cols;
        this.indent = this.nextNonspaceColumn - this.column;
        this.indented = this.indent >= Constants_1.INDENT_LENGTH;
    }
    ;
    // Analyze a line of text and update the document appropriately.
    // We parse markdown text by calling this on each line of input,
    // then finalizing the document.
    incorporateLine(ln) {
        var all_matched = true;
        var container = this.doc;
        this.oldtip = this.tip;
        this.offset = 0;
        this.column = 0;
        this.blank = false;
        this.partiallyConsumedTab = false;
        this.lineNumber += 1;
        // replace NUL characters for security
        if (ln.indexOf('\u0000') !== -1) {
            ln = ln.replace(/\0/g, '\uFFFD');
        }
        this.currentLine = ln;
        // For each containing block, try to parse the associated line start.
        // Bail out on failure: container will point to the last matching block.
        // Set all_matched to false if not all containers match.
        var lastChild;
        while ((lastChild = container.getLastChild()) && lastChild.isOpen()) {
            container = lastChild;
            this.findNextNonspace();
            const continued = (this.blockParsers.get(container).continue(this, container));
            if (!continued) {
                if (this.blockParsers.get(container).earlyExitOnEnd) {
                    // we've hit end of line for fenced code close and can return
                    this.lastLineLength = ln.length;
                    return;
                }
                else {
                    // we've failed to match a block
                    all_matched = false;
                }
            }
            if (!all_matched) {
                container = container.getParent(); // back up to last matching block
                break;
            }
        }
        this.allClosed = (container === this.oldtip);
        if (container == undefined) {
            throw new Error("container cannot be undefined");
        }
        this.lastMatchedContainer = container;
        var matchedLeaf = !this.isParagraphNode(container) &&
            (this.blockParsers.get(container).isLeaf);
        var startsLen = this.blockParsers.length();
        // Unless last matched container is a code block, try new container starts,
        // adding children to the last matched container:
        while (!matchedLeaf) {
            this.findNextNonspace();
            var i = 0;
            while (i < startsLen) {
                if (container == undefined) {
                    throw new Error("container cannot be undefined");
                }
                const blockParser = this.blockParsers.at(i);
                var res = blockParser.tryStart(this, container);
                if (res) {
                    if (blockParser.isLeaf) {
                        container = this.tip;
                        matchedLeaf = true;
                        break;
                    }
                    else {
                        container = this.tip;
                        break;
                    }
                }
                else {
                    i++;
                }
            }
            if (i === startsLen) {
                this.advanceNextNonspace();
                break;
            }
        }
        // What remains at the offset is a text line.  Add the text to the
        // appropriate container.
        // First check for a lazy paragraph continuation:
        if (!this.allClosed && !this.blank &&
            this.tip != undefined &&
            this.blockParsers.get(this.tip).acceptLazyContinuation) {
            if (this.blockParsers.get(this.tip).acceptsLines) {
                // lazy paragraph continuation
                this.addLine();
            }
            else {
                this.blockParsers.get(this.tip).lazyContinue(this, this.tip);
            }
        }
        else {
            if (container == undefined) {
                throw new Error("container  cannot be undefined");
            }
            // finalize any blocks not matched
            this.closeUnmatchedBlocks();
            if (this.blank) {
                const lastChild = container.getLastChild();
                if (lastChild != undefined) {
                    lastChild.setLastLineBlank(true);
                }
            }
            // Block quote lines are never blank as they start with >
            // and we don't count blanks in fenced code for purposes of tight/loose
            // lists or breaking out of lists.  We also don't set _lastLineBlank
            // on an empty list item, or if we just closed a fenced block.
            var lastLineBlank = (this.blank &&
                !this.blockParsers.get(container).ignoreLastLineBlank(this, container));
            // propagate lastLineBlank up through parents:
            var cont = container;
            while (cont) {
                cont.setLastLineBlank(lastLineBlank);
                cont = cont.getParent();
            }
            if (this.blockParsers.get(container).acceptsLines) {
                this.addLine();
                if (this.blockParsers.get(container).finalizeAtLine(this, container)) {
                    this.finalize(container, this.lineNumber);
                }
            }
            else if (this.offset < ln.length && !this.blank) {
                // create paragraph container for line
                //const b = this.blockParsers.getParagraphParser();
                container = this.addChild(this.blockParsers.getParagraphParser(), this.offset);
                this.advanceNextNonspace();
                this.addLine();
            }
        }
        this.lastLineLength = ln.length;
    }
    ;
    // Finalize a block.  Close it and do any necessary postprocessing,
    // e.g. creating string_content from strings, setting the 'tight'
    // or 'loose' status of a list, and parsing the beginnings
    // of paragraphs for reference definitions.  Reset the tip to the
    // parent of the closed block.
    finalize(block, lineNumber) {
        var above = block.getParent();
        block.close();
        if (block.sourceRange == undefined) {
            throw new Error("block.sourcepos cannot be undefined");
        }
        block.sourceRange.end = {
            row: lineNumber,
            column: this.lastLineLength,
        };
        this.blockParsers.get(block).finalize(this, block);
        /*if (above == undefined) {
            throw new Error("above cannot be undefined")
        }*/
        this.tip = above;
    }
    ;
    // Walk through a block & children recursively, parsing string content
    // into inline content where appropriate.
    processInlines(block) {
        var node, event;
        var walker = block.walker();
        while ((event = walker.next())) {
            node = event.node;
            if (!event.entering &&
                this.blockParsers.has(node) &&
                this.blockParsers.get(node).parseInlines) {
                this.inlineParser.parse(this, this.getBlockParser(node), node);
            }
        }
    }
    ;
    // The main parsing function.  Returns a parsed document AST.
    parse(input) {
        this.blockParsers.reinit();
        this.doc = this.blockParsers.instantiateDocument({
            start: {
                row: 1,
                column: 1,
            },
            end: {
                row: 0,
                column: 0,
            },
        });
        this.tip = this.doc;
        this.lineNumber = 0;
        this.lastLineLength = 0;
        this.offset = 0;
        this.column = 0;
        this.lastMatchedContainer = this.doc;
        this.currentLine = "";
        if (this.options.time) {
            console.time("preparing input");
        }
        var lines = input.split(/\n|\r\n?/);
        var len = lines.length;
        if (/(\n|\r\n?)$/.test(input)) {
            // ignore last blank line created by final newline
            --len;
        }
        if (this.options.time) {
            console.timeEnd("preparing input");
        }
        if (this.options.time) {
            console.time("block parsing");
        }
        for (var i = 0; i < len; i++) {
            this.incorporateLine(lines[i]);
        }
        while (this.tip) {
            this.finalize(this.tip, len);
        }
        if (this.options.time) {
            console.timeEnd("block parsing");
        }
        if (this.options.time) {
            console.time("inline parsing");
        }
        this.processInlines(this.doc);
        if (this.options.time) {
            console.timeEnd("inline parsing");
        }
        return this.doc;
    }
    ;
    isParagraphNode(node) {
        return this.blockParsers.isParagraphNode(node);
    }
    getParagraphString(node) {
        if (this.isParagraphNode(node)) {
            return this.blockParsers.getParagraphParser().getString(node);
        }
        else {
            throw new Error(`Node ${node.type} is not a paragraph`);
        }
    }
    setParagraphString(node, str) {
        if (this.isParagraphNode(node)) {
            return this.blockParsers.getParagraphParser().setString(node, str);
        }
        else {
            throw new Error(`Node ${node.type} is not a paragraph`);
        }
    }
    createParagraph(sourcepos) {
        const ctor = this.blockParsers.getParagraphParser().getNodeCtor();
        const result = new ctor(this.blockParsers.getParagraphParser().getNodeType(), sourcepos);
        return result;
    }
    getBlockParser(key) {
        return this.blockParsers.get(key);
    }
    getBlockParsers() {
        return this.blockParsers;
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map