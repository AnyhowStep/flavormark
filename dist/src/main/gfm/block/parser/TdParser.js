"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const TableNode_1 = require("./../node/TableNode");
class TdParser extends BlockParser_1.BlockParser {
    constructor(nodeType = "td", nodeCtor = TableNode_1.Td) {
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
exports.TdParser = TdParser;
//# sourceMappingURL=TdParser.js.map