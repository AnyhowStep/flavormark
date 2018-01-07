"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("./../../../InlineParser");
const C_OPEN_BRACKET = 91;
class LinkStartParser extends InlineParser_1.InlineParser {
    constructor(brackets) {
        super();
        this.brackets = brackets;
    }
    reinit() {
        this.brackets.clear();
    }
    // Add open bracket to delimiter stack and add a text node to block's children.
    parse(parser, node) {
        const c = parser.peek();
        if (c != C_OPEN_BRACKET) {
            return false;
        }
        const startpos = parser.pos;
        parser.pos += 1;
        const text = parser.text('[');
        node.appendChild(text);
        // Add entry to stack for this opener
        this.brackets.push(text, startpos, false);
        return true;
    }
}
exports.LinkStartParser = LinkStartParser;
//# sourceMappingURL=LinkStartParser.js.map