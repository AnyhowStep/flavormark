"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class HtmlBlockNode extends node_1.Node {
    constructor() {
        super(...arguments);
        this.htmlBlockType = -1;
        this.string_content = null;
        this.literal = null;
    }
}
exports.HtmlBlockNode = HtmlBlockNode;
//# sourceMappingURL=HtmlBlockNode.js.map