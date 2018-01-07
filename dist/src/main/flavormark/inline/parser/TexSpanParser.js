"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("./../../../InlineParser");
const TexSpanNode_1 = require("./../node/TexSpanNode");
const C_DOLLAR = 36;
const reDollar = /.\$/;
//Consider not replacing \n in inline tex
const reWhitespace = /[ \t\n\x0b\x0c\x0d]+/g;
class TexSpanParser extends InlineParser_1.InlineParser {
    parse(parser, node) {
        const c = parser.peek();
        if (c != C_DOLLAR) {
            return false;
        }
        const startpos = parser.pos;
        ++parser.pos;
        if (parser.peek() == C_DOLLAR) {
            //Two $$ signs beside each other
            node.appendChild(parser.text("$$"));
            ++parser.pos;
            return true;
        }
        else {
            --parser.pos;
        }
        let matched = parser.match(reDollar);
        while (matched != undefined) {
            if (/[^\\]\$/.test(matched)) {
                const texSpan = new TexSpanNode_1.TexSpanNode('latex');
                texSpan.literal = parser.subject.slice(startpos + 1, parser.pos - 1).trim().replace(reWhitespace, ' ');
                node.appendChild(texSpan);
                return true;
            }
            matched = parser.match(reDollar);
        }
        // If we got here, we didn't match a closing sequence.
        parser.pos = startpos + 1;
        node.appendChild(parser.text("$"));
        return true;
    }
}
exports.TexSpanParser = TexSpanParser;
//# sourceMappingURL=TexSpanParser.js.map