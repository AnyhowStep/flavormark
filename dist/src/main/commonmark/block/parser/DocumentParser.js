"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const DocumentNode_1 = require("./../node/DocumentNode");
class DocumentParser extends BlockParser_1.BlockParser {
    constructor(nodeCtor = DocumentNode_1.DocumentNode) {
        super(nodeCtor);
        this.acceptsLines = false;
    }
    continue() { return true; }
    finalize() { }
    canContain() { return true; }
}
exports.DocumentParser = DocumentParser;
//# sourceMappingURL=DocumentParser.js.map