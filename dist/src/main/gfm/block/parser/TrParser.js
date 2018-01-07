"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const TrNode_1 = require("./../node/TrNode");
class TrParser extends BlockParser_1.BlockParser {
    constructor(nodeCtor = TrNode_1.TrNode) {
        super(nodeCtor);
    }
    continue() { return false; }
    finalize() { }
    canContain() { return false; }
}
exports.TrParser = TrParser;
//# sourceMappingURL=TrParser.js.map