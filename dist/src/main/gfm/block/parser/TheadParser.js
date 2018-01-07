"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const TheadNode_1 = require("./../node/TheadNode");
class TheadParser extends BlockParser_1.BlockParser {
    constructor(nodeCtor = TheadNode_1.TheadNode) {
        super(nodeCtor);
    }
    continue() { return false; }
    finalize() { }
    canContain() { return false; }
}
exports.TheadParser = TheadParser;
//# sourceMappingURL=TheadParser.js.map