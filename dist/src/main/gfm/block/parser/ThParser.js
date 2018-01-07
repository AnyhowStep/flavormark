"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const TableNode_1 = require("./../node/TableNode");
class ThParser extends BlockParser_1.BlockParser {
    constructor(nodeType = "th", nodeCtor = TableNode_1.Th) {
        super(nodeType, nodeCtor);
        this.parseInlines = true;
    }
    continue() { return false; }
    finalize() { }
    canContain() { return false; }
    getString(node) {
        return node.string_content;
    }
}
exports.ThParser = ThParser;
//# sourceMappingURL=ThParser.js.map