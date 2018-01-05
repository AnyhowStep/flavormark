"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InParser_1 = require("./InParser");
//import {Node} from "./Node";
//import {CodeNode} from "./CodeNode";
const LatexNode_1 = require("./LatexNode");
var C_BACKTICK = 36;
var reTicks = /\$+/;
var reTicksHere = /^\$+/;
var reWhitespace = /[ \t\n\x0b\x0c\x0d]+/g;
class InlineLatexParser extends InParser_1.InParser {
    // All of the parsers below try to match something at the current position
    // in the subject.  If they succeed in matching anything, they
    // return the inline matched, advancing the subject.
    // Attempt to parse backticks, adding either a backtick code span or a
    // literal sequence of backticks.
    parse(parser, block) {
        const c = parser.peek();
        if (c != C_BACKTICK) {
            return false;
        }
        var ticks = parser.match(reTicksHere);
        if (ticks === null) {
            return false;
        }
        var afterOpenTicks = parser.pos;
        var matched;
        var node;
        while ((matched = parser.match(reTicks)) !== null) {
            if (matched === ticks) {
                node = new LatexNode_1.LatexNode('latex');
                node.literal = parser.subject.slice(afterOpenTicks, parser.pos - ticks.length)
                    .trim().replace(reWhitespace, ' ');
                block.appendChild(node);
                return true;
            }
        }
        // If we got here, we didn't match a closing backtick sequence.
        parser.pos = afterOpenTicks;
        block.appendChild(parser.text(ticks));
        return true;
    }
}
exports.InlineLatexParser = InlineLatexParser;
//# sourceMappingURL=InlineLatexParser.js.map