"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const TableNode_1 = require("./../node/TableNode");
class TrParser extends BlockParser_1.BlockParser {
    constructor(nodeType = "tr", nodeCtor = TableNode_1.Tr) {
        super(nodeType, nodeCtor);
    }
    continue() { return false; }
    finalize() { }
    canContain() { return false; }
}
exports.TrParser = TrParser;
//# sourceMappingURL=TrParser.js.map