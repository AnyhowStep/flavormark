"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./BlockParser");
//import {Node} from "../Node";
const util_1 = require("./util");
//
const util_2 = require("../refactored-misc/util");
var C_OPEN_BRACKET = 91;
class ParagraphParser extends BlockParser_1.BlockParser {
    constructor(nodeType, nodeCtor, refMap) {
        super(nodeType, nodeCtor);
        this.continue = (parser) => {
            return (parser.blank ? false : true);
        };
        this.finalize = (_parser, block) => {
            var pos;
            var hasReferenceDefs = false;
            // try parsing the beginning as link reference definitions:
            while (util_1.peek(block.string_content, 0) === C_OPEN_BRACKET &&
                (pos =
                    util_2.parseReference(block.string_content, this.refMap))) {
                if (block.string_content == null) {
                    throw new Error("block.string_content cannot be null");
                }
                block.string_content = block.string_content.slice(pos);
                hasReferenceDefs = true;
            }
            if (hasReferenceDefs && util_1.isBlank(block.string_content)) {
                block.unlink();
            }
        };
        this.canContain = () => { return false; };
        this.acceptsLines = true;
        this.parseInlines = true;
        this.acceptLazyContinuation = true;
        this.isLeaf = true;
        this.isParagraph = true;
        this.refMap = refMap;
    }
    reinit() {
        for (let k of Object.keys(this.refMap)) {
            delete this.refMap[k];
        }
    }
    appendString(node, str) {
        if (node.string_content == null) {
            node.string_content = "";
        }
        node.string_content += str;
    }
    setString(node, str) {
        node.string_content = str;
    }
    getString(node) {
        return node.string_content || "";
    }
    // allow raw string to be garbage collected
    unsetString(node) {
        node.string_content = null;
    }
}
exports.ParagraphParser = ParagraphParser;
//export const paragraphParser = new ParagraphParser("paragraph", Node);
//# sourceMappingURL=paragraph.js.map