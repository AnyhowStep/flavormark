"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./BlockParser");
//import {Node} from "../node";
const util_1 = require("./util");
const IndentedCodeBlockNode_1 = require("./IndentedCodeBlockNode");
class IndentedCodeBlockParser extends BlockParser_1.BlockParser {
    constructor() {
        super(...arguments);
        this.tryStart = (parser) => {
            if (parser.indented &&
                parser.tip != null &&
                !parser.isParagraphNode(parser.tip) &&
                !parser.blank) {
                // indented code
                parser.advanceOffset(util_1.CODE_INDENT, true);
                parser.closeUnmatchedBlocks();
                parser.addChild(this, parser.offset);
                return true;
            }
            else {
                return false;
            }
        };
        this.continue = (parser) => {
            var indent = parser.indent;
            if (indent >= util_1.CODE_INDENT) {
                parser.advanceOffset(util_1.CODE_INDENT, true);
            }
            else if (parser.blank) {
                parser.advanceNextNonspace();
            }
            else {
                return false;
            }
            return true;
        };
        this.finalize = (_parser, block) => {
            if (block.string_content == null) {
                throw new Error("block.string_content cannot be null");
            }
            block.literal = block.string_content.replace(/(\n *)+$/, '\n');
            block.string_content = null; // allow GC
        };
        this.canContain = () => { return false; };
        this.acceptsLines = true;
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
exports.IndentedCodeBlockParser = IndentedCodeBlockParser;
exports.indentedCodeBlockParser = new IndentedCodeBlockParser("indented_code_block", IndentedCodeBlockNode_1.IndentedCodeBlockNode);
//# sourceMappingURL=indented-code-block.js.map