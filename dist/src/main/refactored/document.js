"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./BlockParser");
const node_1 = require("../node");
class DocumentParser extends BlockParser_1.BlockParser {
    constructor() {
        super(...arguments);
        this.continue = () => { return true; };
        this.finalize = () => { return; };
        this.canContain = (blockParser) => { return blockParser.isListItem != true; };
        this.acceptsLines = false;
    }
}
exports.DocumentParser = DocumentParser;
exports.documentParser = new DocumentParser("document", node_1.Node);
//# sourceMappingURL=document.js.map