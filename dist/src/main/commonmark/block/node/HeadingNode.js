"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./../../../Node");
class HeadingNode extends Node_1.Node {
    constructor() {
        super(...arguments);
        this.level = -1;
        this.stringContent = "";
    }
}
exports.HeadingNode = HeadingNode;
//# sourceMappingURL=HeadingNode.js.map