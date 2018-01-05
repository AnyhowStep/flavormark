import {InlineParser} from "../InlineParser";
import {InlineContentParser} from "../InlineContentParser";
import {Node} from "../Node";
//import {Node} from "./Node";
import {ENTITY} from "../common";

import {decodeHTML} from "entities";

var C_AMPERSAND = 38;

var reEntityHere = new RegExp('^' + ENTITY, 'i');

export class EntityParser extends InlineParser {
    // Attempt to parse an entity.
    public parse (parser : InlineContentParser, block : Node) : boolean {
        const c = parser.peek();
        if (c != C_AMPERSAND) {
            return false;
        }

        var m;
        if ((m = parser.match(reEntityHere))) {
            block.appendChild(parser.text(decodeHTML(m)));
            return true;
        } else {
            return false;
        }
    }
}
