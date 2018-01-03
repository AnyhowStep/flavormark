import {InParser} from "./InParser";
import {InlineParser} from "../inlines";
import {Node} from "../node";
import {ESCAPABLE} from "../common";

var C_NEWLINE = 10;
var C_BACKSLASH = 92;

var reEscapable = new RegExp('^' + ESCAPABLE);


export class BackslashParser extends InParser {
    // Parse a backslash-escaped special character, adding either the escaped
    // character, a hard line break (if the backslash is followed by a newline),
    // or a literal backslash to the block's children.  Assumes current character
    // is a backslash.
    public parse (parser : InlineParser, block : Node) : boolean {
        const c = parser.peek();
        if (c != C_BACKSLASH) {
            return false;
        }

        var subj = parser.subject;
        var node;
        parser.pos += 1;
        if (parser.peek() === C_NEWLINE) {
            parser.pos += 1;
            node = new Node('linebreak');
            block.appendChild(node);
        } else if (reEscapable.test(subj.charAt(parser.pos))) {
            block.appendChild(parser.text(subj.charAt(parser.pos)));
            parser.pos += 1;
        } else {
            block.appendChild(parser.text('\\'));
        }
        return true;
    }
}
