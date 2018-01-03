"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineNode_1 = require("./InlineNode");
class CodeNode extends InlineNode_1.InlineNode {
    constructor() {
        super(...arguments);
        this.literal = null;
    }
}
exports.CodeNode = CodeNode;
//# sourceMappingURL=CodeNode.js.map