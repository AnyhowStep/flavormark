"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const TableNode_1 = require("./../node/TableNode");
class TheadParser extends BlockParser_1.BlockParser {
    constructor(nodeType = "thead", nodeCtor = TableNode_1.Thead) {
        super(nodeType, nodeCtor);
    }
    continue() { return false; }
    finalize() { }
    canContain() { return false; }
}
exports.TheadParser = TheadParser;
//# sourceMappingURL=TheadParser.js.map