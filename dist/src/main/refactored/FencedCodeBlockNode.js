"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockNode_1 = require("./BlockNode");
class FencedCodeBlockNode extends BlockNode_1.BlockNode {
    constructor() {
        super(...arguments);
        this.fenceLength = -1;
        this.fenceChar = "";
        this.fenceOffset = -1;
        this.string_content = null;
    }
}
exports.FencedCodeBlockNode = FencedCodeBlockNode;
//# sourceMappingURL=FencedCodeBlockNode.js.map