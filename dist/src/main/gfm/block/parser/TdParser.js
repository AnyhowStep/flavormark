"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const TdNode_1 = require("./../node/TdNode");
class TdParser extends BlockParser_1.BlockParser {
    constructor(nodeType = "td", nodeCtor = TdNode_1.TdNode) {
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
exports.TdParser = TdParser;
//# sourceMappingURL=TdParser.js.map