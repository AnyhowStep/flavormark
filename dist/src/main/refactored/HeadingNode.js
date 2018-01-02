"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockNode_1 = require("./BlockNode");
class HeadingNode extends BlockNode_1.BlockNode {
    constructor() {
        super(...arguments);
        this.level = -1;
        this.string_content = null;
    }
}
exports.HeadingNode = HeadingNode;
//# sourceMappingURL=HeadingNode.js.map