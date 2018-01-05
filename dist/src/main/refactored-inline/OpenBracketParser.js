"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InParser_1 = require("../InParser");
var C_OPEN_BRACKET = 91;
class OpenBracketParser extends InParser_1.InParser {
    constructor(brackets) {
        super();
        this.brackets = brackets;
    }
    reinit() {
        this.brackets.clear();
    }
    // Add open bracket to delimiter stack and add a text node to block's children.
    parse(parser, block) {
        const c = parser.peek();
        if (c != C_OPEN_BRACKET) {
            return false;
        }
        var startpos = parser.pos;
        parser.pos += 1;
        var node = parser.text('[');
        block.appendChild(node);
        // Add entry to stack for this opener
        this.brackets.push(node, startpos, false);
        return true;
    }
}
exports.OpenBracketParser = OpenBracketParser;
//# sourceMappingURL=OpenBracketParser.js.map