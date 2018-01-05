"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Node");
class LatexBlockNode extends Node_1.Node {
    constructor() {
        super(...arguments);
        this.fenceLength = -1;
        this.fenceChar = "";
        this.fenceOffset = -1;
        this.oneLine = false;
        this.string_content = null;
        this.literal = null;
    }
}
exports.LatexBlockNode = LatexBlockNode;
//# sourceMappingURL=LatexBlockNode.js.map