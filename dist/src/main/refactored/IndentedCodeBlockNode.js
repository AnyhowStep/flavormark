"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class IndentedCodeBlockNode extends node_1.Node {
    constructor() {
        super(...arguments);
        this.string_content = null;
        this.literal = null;
    }
}
exports.IndentedCodeBlockNode = IndentedCodeBlockNode;
//# sourceMappingURL=IndentedCodeBlockNode.js.map