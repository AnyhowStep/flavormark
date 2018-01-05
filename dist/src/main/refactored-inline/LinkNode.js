"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Node");
class LinkNode extends Node_1.Node {
    constructor() {
        super(...arguments);
        this.destination = null;
        this.title = null;
    }
}
exports.LinkNode = LinkNode;
//# sourceMappingURL=LinkNode.js.map