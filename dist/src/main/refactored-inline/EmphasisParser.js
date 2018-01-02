"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InParser_1 = require("./InParser");
const emphasis_1 = require("../refactored-misc/emphasis");
class EmphasisParser extends InParser_1.InParser {
    constructor(delimiters) {
        super();
        this.delimiters = delimiters;
    }
    parse(_parser, _block) {
        return false;
    }
    finalize() {
        emphasis_1.processEmphasis(this.delimiters, null);
    }
}
exports.EmphasisParser = EmphasisParser;
//# sourceMappingURL=EmphasisParser.js.map