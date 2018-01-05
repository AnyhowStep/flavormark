"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../Node");
class TableNode extends Node_1.Node {
    constructor() {
        super(...arguments);
        this.headers = [];
        this.alignments = [];
        this.rows = [];
        this.tbody = null;
    }
}
exports.TableNode = TableNode;
class Tr extends Node_1.Node {
}
exports.Tr = Tr;
class Thead extends Node_1.Node {
}
exports.Thead = Thead;
class Th extends Node_1.Node {
    constructor() {
        super(...arguments);
        this.alignment = "left";
        this.string_content = "";
    }
}
exports.Th = Th;
class Tbody extends Node_1.Node {
}
exports.Tbody = Tbody;
class Td extends Node_1.Node {
    constructor() {
        super(...arguments);
        this.alignment = "left";
        this.string_content = "";
    }
}
exports.Td = Td;
//# sourceMappingURL=TableNode.js.map