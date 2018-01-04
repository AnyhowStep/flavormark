"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
class TableNode extends node_1.Node {
    constructor() {
        super(...arguments);
        this.headers = [];
        this.alignments = [];
        this.rows = [];
        this.tbody = null;
    }
}
exports.TableNode = TableNode;
class Tr extends node_1.Node {
}
exports.Tr = Tr;
class Thead extends node_1.Node {
}
exports.Thead = Thead;
class Th extends node_1.Node {
    constructor() {
        super(...arguments);
        this.alignment = "left";
        this.string_content = "";
    }
}
exports.Th = Th;
class Tbody extends node_1.Node {
}
exports.Tbody = Tbody;
class Td extends node_1.Node {
    constructor() {
        super(...arguments);
        this.alignment = "left";
        this.string_content = "";
    }
}
exports.Td = Td;
//# sourceMappingURL=TableNode.js.map