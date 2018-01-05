import {InParser} from "./InParser";
import {InlineParser} from "../InlineParser";
import {Node} from "../Node";
import {HardbreakNode} from "./HardbreakNode";
import {SoftbreakNode} from "./SoftbreakNode";

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
            if (hardbreak) {
                block.appendChild(new HardbreakNode());
            } else {
                block.appendChild(new SoftbreakNode());
            }
        } else {
            block.appendChild(new SoftbreakNode());
        }
        parser.match(reInitialSpace); // gobble leading spaces in next line
        return true;
    }
}
