"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class BlockNode extends node_1.Node {
    constructor(nodeType, sourcepos) {
        super(nodeType, sourcepos);
        this.parent = null;
        this.firstChild = null;
        this.lastChild = null;
        this.prev = null;
        this.next = null;
        this.sourcepos = sourcepos;
    }
}
exports.BlockNode = BlockNode;
//# sourceMappingURL=BlockNode.js.map