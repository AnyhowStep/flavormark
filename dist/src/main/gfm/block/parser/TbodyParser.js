"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const TableNode_1 = require("./../node/TableNode");
class TbodyParser extends BlockParser_1.BlockParser {
    constructor(nodeType = "tbody", nodeCtor = TableNode_1.Tbody) {
        super(nodeType, nodeCtor);
    }
    continue() { return false; }
    finalize() { }
    canContain() { return false; }
}
exports.TbodyParser = TbodyParser;
//# sourceMappingURL=TbodyParser.js.map