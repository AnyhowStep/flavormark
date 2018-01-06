"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("../BlockParser");
const Node_1 = require("../Node");
class DocumentParser extends BlockParser_1.BlockParser {
    constructor() {
        super(...arguments);
        this.acceptsLines = false;
    }
    continue() { return true; }
    finalize() { }
    canContain() { return true; }
}
exports.DocumentParser = DocumentParser;
exports.documentParser = new DocumentParser("document", Node_1.Node);
//# sourceMappingURL=document.js.map