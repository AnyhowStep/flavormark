import {InParser} from "./InParser";
import {InlineParser} from "../InlineParser";
import {Node} from "../Node";
import {normalizeURI} from "../common";
import {LinkNode} from "./LinkNode";
var C_LESSTHAN = 60;


var reEmailAutolink = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;

var reAutolink = /^<[A-Za-z][A-Za-z0-9.+-]{1,31}:[^<>\x00-\x20]*>/i;


export class AutolinkParser extends InParser {
    // Attempt to parse an autolink (URL or email in pointy brackets).
    public parse (parser : InlineParser, block : Node) : boolean {
        const c = parser.peek();
        if (c != C_LESSTHAN) {
            return false;
        }
        var m;
        var dest;
        var node;
        if ((m = parser.match(reEmailAutolink))) {
            dest = m.slice(1, m.length - 1);
            node = new LinkNode('link');
            node.destination = normalizeURI('mailto:' + dest);
            node.title = '';
            node.appendChild(parser.text(dest));
            block.appendChild(node);
            return true;
        } else if ((m = parser.match(reAutolink))) {
            dest = m.slice(1, m.length - 1);
            node = new LinkNode('link');
            node.destination = normalizeURI(dest);
            node.title = '';
            node.appendChild(parser.text(dest));
            block.appendChild(node);
            return true;
        } else {
            return false;
        }
    }
}
