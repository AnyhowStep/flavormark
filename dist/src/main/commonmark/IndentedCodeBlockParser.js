"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("../BlockParser");
const Constants_1 = require("../Constants");
const IndentedCodeBlockNode_1 = require("./block/node/IndentedCodeBlockNode");
class IndentedCodeBlockParser extends BlockParser_1.BlockParser {
    constructor(nodeType = "indented_code_block", nodeCtor = IndentedCodeBlockNode_1.IndentedCodeBlockNode) {
        super(nodeType, nodeCtor);
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
        parser.advanceOffset(Constants_1.INDENT_LENGTH, true);
        parser.closeUnmatchedBlocks();
        parser.addChild(this, parser.offset);
        return true;
    }
    continue(parser) {
        const indent = parser.indent;
        if (indent >= Constants_1.INDENT_LENGTH) {
            parser.advanceOffset(Constants_1.INDENT_LENGTH, true);
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