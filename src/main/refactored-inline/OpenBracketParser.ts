import {InParser} from "./InParser";
import {InlineParser} from "../inlines";
import {BlockNode} from "../refactored/BlockNode";
//import {InlineNode} from "./InlineNode";

var C_OPEN_BRACKET = 91;

export class OpenBracketParser extends InParser {
    // Add open bracket to delimiter stack and add a text node to block's children.
    public parse (parser : InlineParser, block : BlockNode) : boolean {
        const c = parser.peek();
        if (c != C_OPEN_BRACKET) {
            return false;
        }
        var startpos = parser.pos;
        parser.pos += 1;

        var node = parser.text('[');
        block.appendChild(node);

        // Add entry to stack for this opener
        parser.brackets.push(node, startpos, false);
        return true;
    }
}
