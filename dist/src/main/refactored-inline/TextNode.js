"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineNode_1 = require("./InlineNode");
class TextNode extends InlineNode_1.InlineNode {
    constructor(str) {
        super("text");
        this.literal = str;
    }
    getString() {
        return this.literal || "";
    }
    setString(str) {
        this.literal = str;
    }
}
exports.TextNode = TextNode;
//# sourceMappingURL=TextNode.js.map