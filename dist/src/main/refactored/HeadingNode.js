"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class HeadingNode extends node_1.Node {
    constructor() {
        super(...arguments);
        this.level = -1;
        this.string_content = null;
    }
}
exports.HeadingNode = HeadingNode;
//# sourceMappingURL=HeadingNode.js.map