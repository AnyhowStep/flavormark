import {InParser} from "./InParser";
import {InlineParser} from "../inlines";
import {BlockNode} from "../refactored/BlockNode";
//import {InlineNode} from "./InlineNode";

var C_BANG = 33;
var C_OPEN_BRACKET = 91;

export class BangParser extends InParser {
    // IF next character is [, and ! delimiter to delimiter stack and
    // add a text node to block's children.  Otherwise just add a text node.
    public parse (parser : InlineParser, block : BlockNode) : boolean {
        const c = parser.peek();
        if (c != C_BANG) {
            return false;
        }
        var startpos = parser.pos;
        parser.pos += 1;
        if (parser.peek() === C_OPEN_BRACKET) {
            parser.pos += 1;

            var node = parser.text('![');
            block.appendChild(node);

            // Add entry to stack for this opener
            parser.addBracket(node, startpos + 1, true);
        } else {
            block.appendChild(parser.text('!'));
        }
        return true;
    }
}
