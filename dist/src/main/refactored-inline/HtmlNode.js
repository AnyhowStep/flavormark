"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineNode_1 = require("./InlineNode");
class HtmlNode extends InlineNode_1.InlineNode {
    constructor() {
        super(...arguments);
        this.literal = null;
    }
}
exports.HtmlNode = HtmlNode;
//# sourceMappingURL=HtmlNode.js.map