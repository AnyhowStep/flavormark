"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./../../../Node");
class HtmlBlockNode extends Node_1.Node {
    constructor() {
        super(...arguments);
        this.htmlBlockType = -1;
        this.stringContent = "";
        this.literal = "";
    }
}
exports.HtmlBlockNode = HtmlBlockNode;
//# sourceMappingURL=HtmlBlockNode.js.map