import {InlineParser} from "../InlineParser";
import {InlineContentParser} from "../InlineContentParser";
import {Node} from "../Node";
//import {Node} from "./Node";
import {CodeNode} from "../commonmark/inline/CodeNode";

var C_BACKTICK = 96;
var reTicks = /`+/;

var reTicksHere = /^`+/;

var reWhitespace = /[ \t\n\x0b\x0c\x0d]+/g;


export class InlineCodeParser extends InlineParser {
    // All of the parsers below try to match something at the current position
    // in the subject.  If they succeed in matching anything, they
    // return the inline matched, advancing the subject.

    // Attempt to parse backticks, adding either a backtick code span or a
    // literal sequence of backticks.
    public parse (parser : InlineContentParser, block : Node) : boolean {
        const c = parser.peek();
        if (c != C_BACKTICK) {
            return false;
        }
        var ticks = parser.match(reTicksHere);
        if (ticks == undefined) {
            return false;
        }
        var afterOpenTicks = parser.pos;
        var matched;
        var node;
        while ((matched = parser.match(reTicks)) != undefined) {
            if (matched === ticks) {
                node = new CodeNode('code');
                node.literal = parser.subject.slice(afterOpenTicks,
                                            parser.pos - ticks.length)
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
