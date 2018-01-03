"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockNode_1 = require("./BlockNode");
class IndentedCodeBlockNode extends BlockNode_1.BlockNode {
    constructor() {
        super(...arguments);
        this.string_content = null;
    }
}
exports.IndentedCodeBlockNode = IndentedCodeBlockNode;
//# sourceMappingURL=IndentedCodeBlockNode.js.map