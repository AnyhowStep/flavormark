import {InParser} from "./InParser";
import {InlineParser} from "../inlines";
import {Node} from "../node";

var C_NEWLINE = 10;
var reFinalSpace = / *$/;

var reInitialSpace = /^ */;

export class NewlineParser extends InParser {
    // Parse a newline.  If it was preceded by two spaces, return a hard
    // line break; otherwise a soft line break.
    public parse (parser : InlineParser, block : Node) : boolean {
        const c = parser.peek();
        if (c != C_NEWLINE) {
            return false;
        }
        ++parser.pos;

        // check previous node for trailing spaces
        var lastc = block.lastChild;
        if (lastc != null && parser.isTextNode(lastc) && lastc.getString()[lastc.getString().length - 1] === ' ') {
            var hardbreak = lastc.getString()[lastc.getString().length - 2] === ' ';
            lastc.setString(lastc.getString().replace(reFinalSpace, ''));
            block.appendChild(new Node(hardbreak ? 'linebreak' : 'softbreak'));
        } else {
            block.appendChild(new Node('softbreak'));
        }
        parser.match(reInitialSpace); // gobble leading spaces in next line
        return true;
    }
}
