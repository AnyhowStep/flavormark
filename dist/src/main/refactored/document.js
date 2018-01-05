"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("../BlockParser");
const Node_1 = require("../Node");
class DocumentParser extends BlockParser_1.BlockParser {
    constructor() {
        super(...arguments);
        this.continue = () => { return true; };
        this.finalize = () => { return; };
        this.canContain = () => { return true; };
        this.acceptsLines = false;
    }
}
exports.DocumentParser = DocumentParser;
exports.documentParser = new DocumentParser("document", Node_1.Node);
//# sourceMappingURL=document.js.map