"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./../../../Node");
class TexBlockNode extends Node_1.Node {
    constructor() {
        super(...arguments);
        this.fenceLength = -1;
        this.fenceChar = "";
        this.fenceOffset = -1;
        this.oneLine = false;
        this.stringContent = "";
        this.literal = "";
    }
}
exports.TexBlockNode = TexBlockNode;
//# sourceMappingURL=TexBlockNode.js.map