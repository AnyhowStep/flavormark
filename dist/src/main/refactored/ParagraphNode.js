"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockNode_1 = require("./BlockNode");
class ParagraphNode extends BlockNode_1.BlockNode {
    constructor() {
        super(...arguments);
        this.string_content = null;
    }
}
exports.ParagraphNode = ParagraphNode;
//# sourceMappingURL=ParagraphNode.js.map