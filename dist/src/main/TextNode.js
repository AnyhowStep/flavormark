"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
//If you want your own custom text node,
//extend this class and pass its ctor to
//InlineContentParser
class TextNode extends Node_1.Node {
    constructor(str) {
        super("text");
        this.literal = "";
        this.literal = str;
    }
    getString() {
        return this.literal;
    }
    setString(str) {
        this.literal = str;
    }
}
exports.TextNode = TextNode;
//# sourceMappingURL=TextNode.js.map