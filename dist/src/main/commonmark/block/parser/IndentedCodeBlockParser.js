"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const IndentedCodeBlockNode_1 = require("./../node/IndentedCodeBlockNode");
class IndentedCodeBlockParser extends BlockParser_1.BlockParser {
    constructor(nodeCtor = IndentedCodeBlockNode_1.IndentedCodeBlockNode) {
        super(nodeCtor);
        this.acceptsLines = true;
        this.isLeaf = true;
    }
    tryStart(parser) {
        if (!parser.indented) {
            return false;
        }
        if (parser.blank) {
            return false;
        }
        if (parser.tip == undefined || parser.isParagraphNode(parser.tip)) {
            return false;
        }
        parser.advanceOffset(parser.indentLength, true);
        parser.closeUnmatchedBlocks();
        parser.addChild(this, parser.offset);
        return true;
    }
    continue(parser) {
        const indent = parser.indent;
        if (indent >= parser.indentLength) {
            parser.advanceOffset(parser.indentLength, true);
            return true;
        }
        else if (parser.blank) {
            parser.advanceNextNonspace();
            return true;
        }
        else {
            return false;
        }
    }
    finalize(_parser, block) {
        block.literal = block.stringContent.replace(/(\n *)+$/, '\n');
    }
    canContain() { return false; }
    appendString(node, str) {
        if (node.stringContent == undefined) {
            node.stringContent = "";
        }
        node.stringContent += str;
    }
    getString(node) {
        return node.stringContent;
    }
}
exports.IndentedCodeBlockParser = IndentedCodeBlockParser;
//# sourceMappingURL=IndentedCodeBlockParser.js.map