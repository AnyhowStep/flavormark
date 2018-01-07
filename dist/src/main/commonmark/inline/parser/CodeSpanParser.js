"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("./../../../InlineParser");
const CodeSpanNode_1 = require("./../node/CodeSpanNode");
const reTicks = /`+/;
const reTicksHere = /^`+/;
const reWhitespace = /[ \t\n\x0b\x0c\x0d]+/g;
class CodeSpanParser extends InlineParser_1.InlineParser {
    // All of the parsers below try to match something at the current position
    // in the subject.  If they succeed in matching anything, they
    // return the inline matched, advancing the subject.
    // Attempt to parse backticks, adding either a backtick code span or a
    // literal sequence of backticks.
    parse(parser, node) {
        const c = parser.peek();
        if (c != "`") {
            return false;
        }
        const ticks = parser.match(reTicksHere);
        if (ticks == undefined) {
            return false;
        }
        const afterOpenTicks = parser.pos;
        let matched = parser.match(reTicks);
        while (matched != undefined) {
            if (matched == ticks) {
                const codeSpan = new CodeSpanNode_1.CodeSpanNode();
                codeSpan.literal = parser.subject.slice(afterOpenTicks, parser.pos - ticks.length)
                    .trim()
                    .replace(reWhitespace, " ");
                node.appendChild(codeSpan);
                return true;
            }
            matched = parser.match(reTicks);
        }
        // If we got here, we didn't match a closing backtick sequence.
        parser.pos = afterOpenTicks;
        node.appendChild(parser.text(ticks));
        return true;
    }
}
exports.CodeSpanParser = CodeSpanParser;
//# sourceMappingURL=CodeSpanParser.js.map