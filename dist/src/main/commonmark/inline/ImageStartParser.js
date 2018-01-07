"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("../../InlineParser");
var C_BANG = 33;
var C_OPEN_BRACKET = 91;
class ImageStartParser extends InlineParser_1.InlineParser {
    constructor(brackets) {
        super();
        this.brackets = brackets;
    }
    parse(parser, node) {
        const c = parser.peek();
        if (c != C_BANG) {
            return false;
        }
        var startpos = parser.pos;
        ++parser.pos;
        if (parser.peek() != C_OPEN_BRACKET) {
            --parser.pos;
            return false;
        }
        ++parser.pos;
        var text = parser.text('![');
        node.appendChild(text);
        // Add entry to stack for this opener
        this.brackets.push(text, startpos + 1, true);
        return true;
    }
}
exports.ImageStartParser = ImageStartParser;
//# sourceMappingURL=ImageStartParser.js.map