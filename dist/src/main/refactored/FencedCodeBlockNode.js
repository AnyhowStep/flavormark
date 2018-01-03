"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class FencedCodeBlockNode extends node_1.Node {
    constructor() {
        super(...arguments);
        this.fenceLength = -1;
        this.fenceChar = "";
        this.fenceOffset = -1;
        this.info = null;
        this.string_content = null;
        this.literal = null;
    }
}
exports.FencedCodeBlockNode = FencedCodeBlockNode;
//# sourceMappingURL=FencedCodeBlockNode.js.map