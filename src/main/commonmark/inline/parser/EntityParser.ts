import {InlineParser} from "./../../../InlineParser";
import {InlineContentParser} from "./../../../InlineContentParser";
import {Node} from "./../../../Node";
import {ENTITY} from "./../../../common";

import {decodeHTML} from "entities";

const C_AMPERSAND = 38;

const reEntityHere = new RegExp('^' + ENTITY, 'i');

export class EntityParser extends InlineParser {
    public parse (parser : InlineContentParser, node : Node) : boolean {
        const c = parser.peek();
        if (c != C_AMPERSAND) {
            return false;
        }
        const m = parser.match(reEntityHere);
        if (m == undefined) {
            return false;
        }
        node.appendChild(parser.text(decodeHTML(m)));
        return true;
    }
}
