"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
class TextNode extends Node_1.Node {
    constructor(str) {
        super("text");
        this.literal = null;
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