"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./BlockParser");
const TextNode_1 = require("./TextNode");
class TextParser extends BlockParser_1.BlockParser {
    constructor(nodeType = "text", nodeCtor = TextNode_1.TextNode) {
        super(nodeType, nodeCtor);
        this.acceptsLines = false;
        this.isLeaf = true;
    }
    tryStart() {
        return false;
    }
    continue() {
        return false;
    }
    ;
    finalize() { }
    canContain() { return false; }
}
exports.TextParser = TextParser;
//# sourceMappingURL=TextParser.js.map