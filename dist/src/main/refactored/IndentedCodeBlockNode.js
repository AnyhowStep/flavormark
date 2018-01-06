"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Node");
class IndentedCodeBlockNode extends Node_1.Node {
    constructor() {
        super(...arguments);
        this.string_content = undefined;
        this.literal = undefined;
    }
}
exports.IndentedCodeBlockNode = IndentedCodeBlockNode;
//# sourceMappingURL=IndentedCodeBlockNode.js.map