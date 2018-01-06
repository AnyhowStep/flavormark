"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("../InlineParser");
const HardbreakNode_1 = require("./HardbreakNode");
const SoftbreakNode_1 = require("./SoftbreakNode");
var C_NEWLINE = 10;
var reFinalSpace = / *$/;
var reInitialSpace = /^ */;
class NewlineParser extends InlineParser_1.InlineParser {
    // Parse a newline.  If it was preceded by two spaces, return a hard
    // line break; otherwise a soft line break.
    parse(parser, block) {
        const c = parser.peek();
        if (c != C_NEWLINE) {
            return false;
        }
        ++parser.pos;
        // check previous node for trailing spaces
        var lastc = block.getLastChild();
        if (lastc != null && parser.isTextNode(lastc) && lastc.getString()[lastc.getString().length - 1] === ' ') {
            var hardbreak = lastc.getString()[lastc.getString().length - 2] === ' ';
            lastc.setString(lastc.getString().replace(reFinalSpace, ''));
            if (hardbreak) {
                block.appendChild(new HardbreakNode_1.HardbreakNode());
            }
            else {
                block.appendChild(new SoftbreakNode_1.SoftbreakNode());
            }
        }
        else {
            block.appendChild(new SoftbreakNode_1.SoftbreakNode());
        }
        parser.match(reInitialSpace); // gobble leading spaces in next line
        return true;
    }
}
exports.NewlineParser = NewlineParser;
//# sourceMappingURL=NewlineParser.js.map