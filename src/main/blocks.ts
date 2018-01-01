import {Node, NodeType} from "./node";
var CODE_INDENT = 4;
var C_NEWLINE = 10;

import {InlineParser, Options as InlineParserOptions}  from "./inlines";

var reMaybeSpecial = /^[#`~*+_=<>0-9-]/;

var reLineEnding = /\r\n|\n|\r/;


// DOC PARSER

// These are methods of a Parser object, defined below.

import {documentParser} from "./refactored/document";
import {listParser} from "./refactored/list";
import {blockquoteParser} from "./refactored/blockquote";
import {itemParser} from "./refactored/item";
//import {headingParser} from "./refactored/heading";
import {thematicBreakParser} from "./refactored/thematic-break";
//import {codeBlockParser} from "./refactored/code-block";
import {htmlBlockParser} from "./refactored/html-block";
import {paragraphParser} from "./refactored/paragraph";
import {atxHeadingParser} from "./refactored/atx-heading";
import {setextHeadingParser} from "./refactored/setext-heading";
import {fencedCodeBlockParser} from "./refactored/fenced-code-block";
import {indentedCodeBlockParser} from "./refactored/indented-code-block";
import {BlockParser} from "./refactored/BlockParser";


// 'finalize' is run when the block is closed.
// 'continue' is run to check whether the block is continuing
// at a certain line and offset (e.g. whether a block quote
// contains a `>`.  It returns 0 for matched, 1 for not matched,
// and 2 for "we've dealt with this line completely, go to next."
var blocks : {
    [k : string] : BlockParser
} = {
    document: documentParser,
    list: listParser,
    block_quote: blockquoteParser,
    item: itemParser,
    atx_heading: atxHeadingParser,
    setext_heading: setextHeadingParser,
    thematic_break: thematicBreakParser,
    indented_code_block: indentedCodeBlockParser,
    fenced_code_block: fencedCodeBlockParser,
    html_block: htmlBlockParser,
    paragraph: paragraphParser
};

// block start functions.  Return values:
// 0 = no match
// 1 = matched container, keep going
// 2 = matched leaf, no more block starts
var blockStarts = [
    // block quote
    blockquoteParser.tryStart,

    // ATX heading
    atxHeadingParser.tryStart,

    // Fenced code block
    fencedCodeBlockParser.tryStart,

    // HTML block
    htmlBlockParser.tryStart,

    // Setext heading
    setextHeadingParser.tryStart,

    // thematic break
    thematicBreakParser.tryStart,

    // list item
    itemParser.tryStart,

    // indented code block
    indentedCodeBlockParser.tryStart

];

export class Document extends Node {
    constructor () {
        super("document", [[1, 1], [0, 0]]);
    }
}


export interface Options extends InlineParserOptions {
    time? : boolean
}

export class Parser {
    doc = new Document();
    blocks = blocks;
    blockStarts = blockStarts;
    tip : Node|null = this.doc;
    oldtip : Node|null = this.doc;
    currentLine = "";
    lineNumber = 0;
    offset = 0;
    column = 0;
    nextNonspace = 0;
    nextNonspaceColumn = 0;
    indent = 0;
    indented = false;
    blank = false;
    partiallyConsumedTab = false;
    allClosed = true;
    lastMatchedContainer : Node = this.doc;
    refmap = {};
    lastLineLength = 0;
    inlineParser : InlineParser ;
    options : Options;
    constructor (options? : Options|undefined) {
        this.inlineParser = new InlineParser(options);
        this.options = options || {};
    }


    // Add a line to the block at the tip.  We assume the tip
    // can accept lines -- that check should be done before calling this.
    addLine() {
        if (this.tip == null) {
            throw new Error("this.tip cannot be null")
        }
        if (!blocks[this.tip.type].acceptsLines) {
            throw new Error(`Cannot add line to ${this.tip.type}; it does not accept lines`)
        }
        if (this.partiallyConsumedTab) {
          this.offset += 1; // skip over tab
          // add space characters:
          var charsToTab = 4 - (this.column % 4);
          this.tip.string_content += (' '.repeat(charsToTab));
        }
        this.tip.string_content += this.currentLine.slice(this.offset) + '\n';
    };

    // Add block of type tag as a child of the tip.  If the tip can't
    // accept children, close and finalize it and try its parent,
    // and so on til we find a block that can accept children.
    addChild(tag : NodeType, offset : number) {
        if (this.tip == null) {
            throw new Error("this.tip cannot be null");
        }
        while (!this.blocks[this.tip.type].canContain(tag)) {
            this.finalize(this.tip, this.lineNumber - 1);
        }

        var column_number = offset + 1; // offset 0 = column 1
        var newBlock = new Node(tag, [[this.lineNumber, column_number], [0, 0]]);
        newBlock.string_content = '';
        this.tip.appendChild(newBlock);
        this.tip = newBlock;
        return newBlock;
    };

    // Finalize and close any unmatched blocks.
    closeUnmatchedBlocks() {
        if (!this.allClosed) {
            // finalize any blocks not matched
            while (this.oldtip !== this.lastMatchedContainer) {

                if (this.oldtip == null) {
                    throw new Error("this.oldtip cannot be null");
                }
                var parent = this.oldtip.parent;
                this.finalize(this.oldtip, this.lineNumber - 1);
                if (parent == null) {
                    throw new Error("parent cannot be null");
                }
                this.oldtip = parent;
            }
            this.allClosed = true;
        }
    };
    advanceOffset(count : number, columns? : boolean) {
        var currentLine = this.currentLine;
        var charsToTab, charsToAdvance;
        var c;
        while (count > 0 && (c = currentLine[this.offset])) {
            if (c === '\t') {
                charsToTab = 4 - (this.column % 4);
                if (columns) {
                    this.partiallyConsumedTab = charsToTab > count;
                    charsToAdvance = charsToTab > count ? count : charsToTab;
                    this.column += charsToAdvance;
                    this.offset += this.partiallyConsumedTab ? 0 : 1;
                    count -= charsToAdvance;
                } else {
                    this.partiallyConsumedTab = false;
                    this.column += charsToTab;
                    this.offset += 1;
                    count -= 1;
                }
            } else {
                this.partiallyConsumedTab = false;
                this.offset += 1;
                this.column += 1; // assume ascii; block starts are ascii
                count -= 1;
            }
        }
    };

    advanceNextNonspace() {
        this.offset = this.nextNonspace;
        this.column = this.nextNonspaceColumn;
        this.partiallyConsumedTab = false;
    };

    findNextNonspace() {
        var currentLine = this.currentLine;
        var i = this.offset;
        var cols = this.column;
        var c;

        while ((c = currentLine.charAt(i)) !== '') {
            if (c === ' ') {
                i++;
                cols++;
            } else if (c === '\t') {
                i++;
                cols += (4 - (cols % 4));
            } else {
                break;
            }
        }
        this.blank = (c === '\n' || c === '\r' || c === '');
        this.nextNonspace = i;
        this.nextNonspaceColumn = cols;
        this.indent = this.nextNonspaceColumn - this.column;
        this.indented = this.indent >= CODE_INDENT;
    };

    // Analyze a line of text and update the document appropriately.
    // We parse markdown text by calling this on each line of input,
    // then finalizing the document.
    incorporateLine(ln : string) {
        var all_matched = true;
        var t;

        var container : Node|null = this.doc;
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
        while ((lastChild = container.lastChild) && lastChild.open) {
            container = lastChild;

            this.findNextNonspace();

            const continued = (this.blocks[container.type].continue(this, container));
            if (!continued) {
                if (this.blocks[container.type].earlyExitOnEnd) {
                    // we've hit end of line for fenced code close and can return
                    this.lastLineLength = ln.length;
                    return;
                } else {
                    // we've failed to match a block
                    all_matched = false;
                }
            }
            /*
            let continueResult : 0|1|2 = this.blocks[container.type].continue(this, container);
            if (continueResult == 1 && this.blocks[container.type].earlyExitOnEnd == true) {
                console.log(container.type);
                continueResult = 2;
            }
            switch (continueResult) {
                case 0: // we've matched, keep going
                    break;
                case 1: // we've failed to match a block
                    all_matched = false;
                    break;
                case 2: // we've hit end of line for fenced code close and can return
                    this.lastLineLength = ln.length;
                    return;
                default:
                    throw 'continue returned illegal value, must be 0, 1, or 2';
            }*/
            if (!all_matched) {
                container = container.parent; // back up to last matching block
                break;
            }
        }

        this.allClosed = (container === this.oldtip);
        if (container == null) {
            throw  new Error("container cannot be null")
        }
        this.lastMatchedContainer = container;

        var matchedLeaf = container.type !== 'paragraph' &&
                blocks[container.type].acceptsLines;
        var starts = this.blockStarts;
        var startsLen = starts.length;
        // Unless last matched container is a code block, try new container starts,
        // adding children to the last matched container:
        while (!matchedLeaf) {

            this.findNextNonspace();

            // this is a little performance optimization:
            if (!this.indented &&
                !reMaybeSpecial.test(ln.slice(this.nextNonspace))) {
                this.advanceNextNonspace();
                break;
            }

            var i = 0;
            while (i < startsLen) {
                if (container == null) {
                    throw new Error("container cannot be null")
                }
                var res = starts[i](this, container);
                if (res === 1) {
                    container = this.tip;
                    break;
                } else if (res === 2) {
                    container = this.tip;
                    matchedLeaf = true;
                    break;
                } else {
                    i++;
                }
            }

            if (i === startsLen) { // nothing matched
                this.advanceNextNonspace();
                break;
            }
        }

        // What remains at the offset is a text line.  Add the text to the
        // appropriate container.

       // First check for a lazy paragraph continuation:
        if (!this.allClosed && !this.blank &&
            this.tip != null &&
            blocks[this.tip.type].acceptLazyContinuation) {
            // lazy paragraph continuation
            this.addLine();

        } else { // not a lazy continuation
            if (container == null) {
                throw new Error("container  cannot be null")
            }
            // finalize any blocks not matched
            this.closeUnmatchedBlocks();
            if (this.blank && container.lastChild) {
                container.lastChild.lastLineBlank = true;
            }

            t = container.type;
            const ignoreLastLineBlankPredicate = blocks[container.type].ignoreLastLineBlank;
            // Block quote lines are never blank as they start with >
            // and we don't count blanks in fenced code for purposes of tight/loose
            // lists or breaking out of lists.  We also don't set _lastLineBlank
            // on an empty list item, or if we just closed a fenced block.
            var lastLineBlank = this.blank &&
                (
                    ignoreLastLineBlankPredicate == null ||
                    !ignoreLastLineBlankPredicate(this, container)
                );

            // propagate lastLineBlank up through parents:
            var cont : Node|null = container;
            while (cont) {
                cont.lastLineBlank = lastLineBlank;
                cont = cont.parent;
            }

            if (this.blocks[t].acceptsLines) {
                this.addLine();
                const finalizeAtLine = blocks[container.type].finalizeAtLine;
                if (finalizeAtLine != null && finalizeAtLine(this, container)) {
                    this.finalize(container, this.lineNumber);
                }

            } else if (this.offset < ln.length && !this.blank) {
                // create paragraph container for line
                container = this.addChild('paragraph', this.offset);
                this.advanceNextNonspace();
                this.addLine();
            }
        }
        this.lastLineLength = ln.length;
    };

    // Finalize a block.  Close it and do any necessary postprocessing,
    // e.g. creating string_content from strings, setting the 'tight'
    // or 'loose' status of a list, and parsing the beginnings
    // of paragraphs for reference definitions.  Reset the tip to the
    // parent of the closed block.
    finalize(block : Node, lineNumber : number) {
        var above = block.parent;
        block.open = false;
        if (block.sourcepos == null) {
            throw new Error("block.sourcepos cannot be null")
        }
        block.sourcepos[1] = [lineNumber, this.lastLineLength];

        this.blocks[block.type].finalize(this, block);

        /*if (above == null) {
            throw new Error("above cannot be null")
        }*/
        this.tip = above;
    };

    // Walk through a block & children recursively, parsing string content
    // into inline content where appropriate.
    processInlines(block : Node) {
        var node, event, t;
        var walker = block.walker();
        this.inlineParser.refmap = this.refmap;
        this.inlineParser.options = this.options;
        while ((event = walker.next())) {
            node = event.node;
            t = node.type;
            if (!event.entering && blocks[t].parseInlines) {
                this.inlineParser.parse(node);
            }
        }
    };

    // The main parsing function.  Returns a parsed document AST.
    parse(input : string) {
        this.doc = new Document();
        this.tip = this.doc;
        this.refmap = {};
        this.lineNumber = 0;
        this.lastLineLength = 0;
        this.offset = 0;
        this.column = 0;
        this.lastMatchedContainer = this.doc;
        this.currentLine = "";
        if (this.options.time) { console.time("preparing input"); }
        var lines = input.split(reLineEnding);
        var len = lines.length;
        if (input.charCodeAt(input.length - 1) === C_NEWLINE) {
            // ignore last blank line created by final newline
            len -= 1;
        }
        if (this.options.time) { console.timeEnd("preparing input"); }
        if (this.options.time) { console.time("block parsing"); }
        for (var i = 0; i < len; i++) {
            this.incorporateLine(lines[i]);
        }
        while (this.tip) {
            this.finalize(this.tip, len);
        }
        if (this.options.time) { console.timeEnd("block parsing"); }
        if (this.options.time) { console.time("inline parsing"); }
        this.processInlines(this.doc);
        if (this.options.time) { console.timeEnd("inline parsing"); }
        return this.doc;
    };
}
