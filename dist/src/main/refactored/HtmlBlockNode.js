"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockNode_1 = require("./BlockNode");
class HtmlBlockNode extends BlockNode_1.BlockNode {
    constructor() {
        super(...arguments);
        this.htmlBlockType = -1;
        this.string_content = null;
    }
}
exports.HtmlBlockNode = HtmlBlockNode;
//# sourceMappingURL=HtmlBlockNode.js.map