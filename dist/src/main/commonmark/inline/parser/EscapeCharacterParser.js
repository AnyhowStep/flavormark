"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("./../../../InlineParser");
const common_1 = require("./../../../common");
const HardbreakNode_1 = require("./../node/HardbreakNode");
const C_NEWLINE = 10;
const C_BACKSLASH = 92;
const reEscapable = new RegExp('^' + common_1.ESCAPABLE);
class EscapeCharacterParser extends InlineParser_1.InlineParser {
    parse(parser, node) {
        const c = parser.peek();
        if (c != C_BACKSLASH) {
            return false;
        }
        const subj = parser.subject;
        ++parser.pos;
        if (parser.peek() === C_NEWLINE) {
            ++parser.pos;
            const hardbreak = new HardbreakNode_1.HardbreakNode();
            node.appendChild(hardbreak);
        }
        else if (reEscapable.test(subj.charAt(parser.pos))) {
            node.appendChild(parser.text(subj.charAt(parser.pos)));
            ++parser.pos;
        }
        else {
            node.appendChild(parser.text('\\'));
        }
        return true;
    }
}
exports.EscapeCharacterParser = EscapeCharacterParser;
//# sourceMappingURL=EscapeCharacterParser.js.map