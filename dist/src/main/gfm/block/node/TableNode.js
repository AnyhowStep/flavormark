"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./../../../Node");
class TableNode extends Node_1.Node {
    constructor() {
        super(...arguments);
        this.headers = [];
        this.alignments = [];
        this.rows = [];
        this.tbody = undefined;
    }
}
exports.TableNode = TableNode;
//# sourceMappingURL=TableNode.js.map