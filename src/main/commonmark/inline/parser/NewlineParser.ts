import {InlineParser} from "./../../../InlineParser";
import {InlineContentParser} from "./../../../InlineContentParser";
import {Node} from "./../../../Node";
import {HardbreakNode} from "./../node/HardbreakNode";
import {SoftbreakNode} from "./../node/SoftbreakNode";

const C_NEWLINE = 10;
const reFinalSpace = / *$/;

const reInitialSpace = /^ */;

export class NewlineParser extends InlineParser {
    public parse (parser : InlineContentParser, block : Node) : boolean {
        const c = parser.peek();
        if (c != C_NEWLINE) {
            return false;
        }
        ++parser.pos;

        // check previous node for trailing spaces
        const lastc = block.getLastChild();
        if (
            lastc != undefined &&
            parser.isTextNode(lastc) &&
            lastc.getString()[lastc.getString().length - 1] === " "
        ) {
            const isHardbreak = lastc.getString()[lastc.getString().length - 2] === " ";
            lastc.setString(lastc.getString().replace(reFinalSpace, ""));
            if (isHardbreak) {
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
