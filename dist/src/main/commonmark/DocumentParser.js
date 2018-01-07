"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("../BlockParser");
const DocumentNode_1 = require("./block/node/DocumentNode");
class DocumentParser extends BlockParser_1.BlockParser {
    constructor(nodeType = "document", nodeCtor = DocumentNode_1.DocumentNode) {
        super(nodeType, nodeCtor);
        this.acceptsLines = false;
    }
    continue() { return true; }
    finalize() { }
    canContain() { return true; }
}
exports.DocumentParser = DocumentParser;
//# sourceMappingURL=DocumentParser.js.map