"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const TbodyNode_1 = require("./../node/TbodyNode");
class TbodyParser extends BlockParser_1.BlockParser {
    constructor(nodeCtor = TbodyNode_1.TbodyNode) {
        super(nodeCtor);
    }
    continue() { return false; }
    finalize() { }
    canContain() { return false; }
}
exports.TbodyParser = TbodyParser;
//# sourceMappingURL=TbodyParser.js.map