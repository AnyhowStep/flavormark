import {InParser} from "./InParser";
import {InlineParser} from "../InlineParser";
import {Node} from "../node";
//import {Node} from "./Node";
import {fromCodePoint} from "../from-code-point";

var C_LESSTHAN = 60;


export class LessThanLiteralParser extends InParser {
    // Needed so we don't parse this character in StringParser
    public parse (parser : InlineParser, block : Node) : boolean {
        const c = parser.peek();
        if (c != C_LESSTHAN) {
            return false;
        }
        parser.pos += 1;
        block.appendChild(parser.text(fromCodePoint(c)));
        return true;
    }
}
