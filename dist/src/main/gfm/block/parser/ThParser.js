"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const ThNode_1 = require("./../node/ThNode");
class ThParser extends BlockParser_1.BlockParser {
    constructor(nodeType = "th", nodeCtor = ThNode_1.ThNode) {
        super(nodeType, nodeCtor);
        this.parseInlines = true;
    }
    continue() { return false; }
    finalize() { }
    canContain() { return false; }
    getString(node) {
        return node.stringContent;
    }
}
exports.ThParser = ThParser;
//# sourceMappingURL=ThParser.js.map