"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("../BlockParser");
//import {Node} from "../Node";
const Constants_1 = require("../Constants");
const IndentedCodeBlockNode_1 = require("./IndentedCodeBlockNode");
class IndentedCodeBlockParser extends BlockParser_1.BlockParser {
    constructor() {
        super(...arguments);
        this.acceptsLines = true;
        this.isLeaf = true;
    }
    tryStart(parser) {
        if (parser.indented &&
            parser.tip != undefined &&
            !parser.isParagraphNode(parser.tip) &&
            !parser.blank) {
            // indented code
            parser.advanceOffset(Constants_1.INDENT_LENGTH, true);
            parser.closeUnmatchedBlocks();
            parser.addChild(this, parser.offset);
            return true;
        }
        else {
            return false;
        }
    }
    ;
    continue(parser) {
        var indent = parser.indent;
        if (indent >= Constants_1.INDENT_LENGTH) {
            parser.advanceOffset(Constants_1.INDENT_LENGTH, true);
        }
        else if (parser.blank) {
            parser.advanceNextNonspace();
        }
        else {
            return false;
        }
        return true;
    }
    finalize(_parser, block) {
        if (block.string_content == undefined) {
            throw new Error("block.string_content cannot be undefined");
        }
        block.literal = block.string_content.replace(/(\n *)+$/, '\n');
        block.string_content = undefined; // allow GC
    }
    ;
    canContain() { return false; }
    appendString(node, str) {
        if (node.string_content == undefined) {
            node.string_content = "";
        }
        node.string_content += str;
    }
    getString(node) {
        return node.string_content || "";
    }
    // allow raw string to be garbage collected
    unsetString(node) {
        node.string_content = undefined;
    }
}
exports.IndentedCodeBlockParser = IndentedCodeBlockParser;
exports.indentedCodeBlockParser = new IndentedCodeBlockParser("indented_code_block", IndentedCodeBlockNode_1.IndentedCodeBlockNode);
//# sourceMappingURL=indented-code-block.js.map