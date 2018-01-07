"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("./../../../InlineParser");
const common_1 = require("./../../../common");
const HardbreakNode_1 = require("./../node/HardbreakNode");
const C_NEWLINE = 10;
const C_BACKSLASH = 92;
const reEscapable = new RegExp('^' + common_1.ESCAPABLE);
class EscapeCharacterParser extends InlineParser_1.InlineParser {
    parse(parser, block) {
        const c = parser.peek();
        if (c != C_BACKSLASH) {
            return false;
        }
        const subj = parser.subject;
        ++parser.pos;
        if (parser.peek() === C_NEWLINE) {
            ++parser.pos;
            const node = new HardbreakNode_1.HardbreakNode();
            block.appendChild(node);
        }
        else if (reEscapable.test(subj.charAt(parser.pos))) {
            block.appendChild(parser.text(subj.charAt(parser.pos)));
            ++parser.pos;
        }
        else {
            block.appendChild(parser.text('\\'));
        }
        return true;
    }
}
exports.EscapeCharacterParser = EscapeCharacterParser;
//# sourceMappingURL=EscapeCharacterParser.js.map