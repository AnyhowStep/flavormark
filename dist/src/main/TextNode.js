"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
//If you want your own custom text node,
//extend this class and pass its ctor to
//InlineContentParser
class TextNode extends Node_1.Node {
    constructor(strOrRange) {
        super((typeof strOrRange == "string") ?
            undefined :
            strOrRange);
        this.literal = "";
        if (typeof strOrRange == "string") {
            this.literal = strOrRange;
        }
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