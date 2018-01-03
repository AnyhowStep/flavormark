"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class TextNode extends node_1.Node {
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