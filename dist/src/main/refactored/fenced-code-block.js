"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./BlockParser");
const util_1 = require("./util");
const common_1 = require("../common");
const BlockNode_1 = require("./BlockNode");
var reCodeFence = /^`{3,}(?!.*`)|^~{3,}(?!.*~)/;
var reClosingCodeFence = /^(?:`{3,}|~{3,})(?= *$)/;
class FencedCodeBlockParser extends BlockParser_1.BlockParser {
    constructor() {
        super(...arguments);
        this.tryStart = (parser) => {
            var match;
            if (!parser.indented &&
                (match = parser.currentLine.slice(parser.nextNonspace).match(reCodeFence))) {
                var fenceLength = match[0].length;
                parser.closeUnmatchedBlocks();
                var container = parser.addChild(this, parser.nextNonspace);
                container.fenceLength = fenceLength;
                container.fenceChar = match[0][0];
                container.fenceOffset = parser.indent;
                parser.advanceNextNonspace();
                parser.advanceOffset(fenceLength, false);
                return true;
            }
            else {
                return false;
            }
        };
        this.continue = (parser, container) => {
            var ln = parser.currentLine;
            var indent = parser.indent;
            var match = (indent <= 3 &&
                ln.charAt(parser.nextNonspace) === container.fenceChar &&
                ln.slice(parser.nextNonspace).match(reClosingCodeFence));
            if (match && match[0].length >= container.fenceLength) {
                // closing fence - we're at end of line, so we can return
                parser.finalize(container, parser.lineNumber);
                return false;
            }
            else {
                // skip optional spaces of fence offset
                var i = container.fenceOffset;
                if (i == null) {
                    throw new Error("i cannot be null");
                }
                while (i > 0 && util_1.isSpaceOrTab(util_1.peek(ln, parser.offset))) {
                    parser.advanceOffset(1, true);
                    i--;
                }
            }
            return true;
        };
        this.finalize = (_parser, block) => {
            // first line becomes info string
            var content = block.string_content;
            if (content == null) {
                throw new Error("content cannot be null");
            }
            var newlinePos = content.indexOf('\n');
            var firstLine = content.slice(0, newlinePos);
            var rest = content.slice(newlinePos + 1);
            block.info = common_1.unescapeString(firstLine.trim());
            block.literal = rest;
            block.string_content = null; // allow GC
        };
        this.canContain = () => { return false; };
        this.acceptsLines = true;
        this.earlyExitOnEnd = true;
        this.ignoreLastLineBlank = (_parser, _container) => { return true; };
        this.isLeaf = true;
    }
    appendString(node, str) {
        if (node.string_content == null) {
            node.string_content = "";
        }
        node.string_content += str;
    }
    getString(node) {
        return node.string_content || "";
    }
    // allow raw string to be garbage collected
    unsetString(node) {
        node.string_content = null;
    }
}
exports.FencedCodeBlockParser = FencedCodeBlockParser;
exports.fencedCodeBlockParser = new FencedCodeBlockParser("fenced_code_block", BlockNode_1.BlockNode);
//# sourceMappingURL=fenced-code-block.js.map