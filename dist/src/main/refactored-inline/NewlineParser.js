"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InParser_1 = require("./InParser");
const InlineNode_1 = require("./InlineNode");
var C_NEWLINE = 10;
var reFinalSpace = / *$/;
var reInitialSpace = /^ */;
class NewlineParser extends InParser_1.InParser {
    // Parse a newline.  If it was preceded by two spaces, return a hard
    // line break; otherwise a soft line break.
    parse(parser, block) {
        const c = parser.peek();
        if (c != C_NEWLINE) {
            return false;
        }
        ++parser.pos;
        // check previous node for trailing spaces
        var lastc = block.lastChild;
        if (lastc != null && parser.isTextNode(lastc) && lastc.getString()[lastc.getString().length - 1] === ' ') {
            var hardbreak = lastc.getString()[lastc.getString().length - 2] === ' ';
            lastc.setString(lastc.getString().replace(reFinalSpace, ''));
            block.appendChild(new InlineNode_1.InlineNode(hardbreak ? 'linebreak' : 'softbreak'));
        }
        else {
            block.appendChild(new InlineNode_1.InlineNode('softbreak'));
        }
        parser.match(reInitialSpace); // gobble leading spaces in next line
        return true;
    }
}
exports.NewlineParser = NewlineParser;
//# sourceMappingURL=NewlineParser.js.map