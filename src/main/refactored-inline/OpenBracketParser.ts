import {InParser} from "./InParser";
import {InlineParser} from "../InlineParser";
import {Node} from "../node";
//import {Node} from "./Node";
import {BracketCollection} from "../refactored-misc/BracketCollection";

var C_OPEN_BRACKET = 91;

export class OpenBracketParser extends InParser {
    private brackets : BracketCollection;
    public constructor (brackets : BracketCollection) {
        super();
        this.brackets = brackets;
    }
    public reinit () {
        this.brackets.clear();
    }
    // Add open bracket to delimiter stack and add a text node to block's children.
    public parse (parser : InlineParser, block : Node) : boolean {
        const c = parser.peek();
        if (c != C_OPEN_BRACKET) {
            return false;
        }
        var startpos = parser.pos;
        parser.pos += 1;

        var node = parser.text('[');
        block.appendChild(node);

        // Add entry to stack for this opener
        this.brackets.push(node, startpos, false);
        return true;
    }
}
