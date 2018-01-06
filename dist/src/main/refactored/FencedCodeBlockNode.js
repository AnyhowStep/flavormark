"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Node");
class FencedCodeBlockNode extends Node_1.Node {
    constructor() {
        super(...arguments);
        this.fenceLength = -1;
        this.fenceChar = "";
        this.fenceOffset = -1;
        this.info = undefined;
        this.string_content = undefined;
        this.literal = undefined;
    }
}
exports.FencedCodeBlockNode = FencedCodeBlockNode;
//# sourceMappingURL=FencedCodeBlockNode.js.map