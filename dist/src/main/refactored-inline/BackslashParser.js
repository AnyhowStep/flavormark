"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InParser_1 = require("./InParser");
const common_1 = require("../common");
const HardbreakNode_1 = require("./HardbreakNode");
var C_NEWLINE = 10;
var C_BACKSLASH = 92;
var reEscapable = new RegExp('^' + common_1.ESCAPABLE);
class BackslashParser extends InParser_1.InParser {
    // Parse a backslash-escaped special character, adding either the escaped
    // character, a hard line break (if the backslash is followed by a newline),
    // or a literal backslash to the block's children.  Assumes current character
    // is a backslash.
    parse(parser, block) {
        const c = parser.peek();
        if (c != C_BACKSLASH) {
            return false;
        }
        var subj = parser.subject;
        var node;
        parser.pos += 1;
        if (parser.peek() === C_NEWLINE) {
            parser.pos += 1;
            node = new HardbreakNode_1.HardbreakNode();
            block.appendChild(node);
        }
        else if (reEscapable.test(subj.charAt(parser.pos))) {
            block.appendChild(parser.text(subj.charAt(parser.pos)));
            parser.pos += 1;
        }
        else {
            block.appendChild(parser.text('\\'));
        }
        return true;
    }
}
exports.BackslashParser = BackslashParser;
//# sourceMappingURL=BackslashParser.js.map