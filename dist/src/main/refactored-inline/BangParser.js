"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InParser_1 = require("./InParser");
var C_BANG = 33;
var C_OPEN_BRACKET = 91;
class BangParser extends InParser_1.InParser {
    constructor(brackets) {
        super();
        this.brackets = brackets;
    }
    // IF next character is [, and ! delimiter to delimiter stack and
    // add a text node to block's children.  Otherwise just add a text node.
    parse(parser, block) {
        const c = parser.peek();
        if (c != C_BANG) {
            return false;
        }
        var startpos = parser.pos;
        parser.pos += 1;
        if (parser.peek() === C_OPEN_BRACKET) {
            parser.pos += 1;
            var node = parser.text('![');
            block.appendChild(node);
            // Add entry to stack for this opener
            this.brackets.push(node, startpos + 1, true);
        }
        else {
            block.appendChild(parser.text('!'));
        }
        return true;
    }
}
exports.BangParser = BangParser;
//# sourceMappingURL=BangParser.js.map