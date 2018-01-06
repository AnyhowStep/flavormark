import {InlineParser} from "../../InlineParser";
import {InlineContentParser} from "../../InlineContentParser";
import {Node} from "../../Node";
import {BracketCollection} from "../../refactored-misc/BracketCollection";

var C_BANG = 33;
var C_OPEN_BRACKET = 91;

export class BangParser extends InlineParser {
    private brackets : BracketCollection;
    public constructor (brackets : BracketCollection) {
        super();
        this.brackets = brackets;
    }
    public parse (parser : InlineContentParser, node : Node) : boolean {
        const c = parser.peek();
        if (c != C_BANG) {
            return false;
        }
        var startpos = parser.pos;
        ++parser.pos;
        if (parser.peek() != C_OPEN_BRACKET) {
            --parser.pos;
            return false;
        }
        ++parser.pos;

        var text = parser.text('![');
        node.appendChild(text);

        // Add entry to stack for this opener
        this.brackets.push(text, startpos + 1, true);
        return true;
    }
}
