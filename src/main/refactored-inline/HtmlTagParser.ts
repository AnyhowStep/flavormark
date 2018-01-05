import {InParser} from "./InParser";
import {InlineParser} from "../InlineParser";
import {Node} from "../Node";
//import {Node} from "./Node";
import {reHtmlTag} from "../common";
import {HtmlNode} from "./HtmlNode";
var C_LESSTHAN = 60;


export class HtmlTagParser extends InParser {
    // Attempt to parse a raw HTML tag.
    public parse (parser : InlineParser, block : Node) : boolean {
        const c = parser.peek();
        if (c != C_LESSTHAN) {
            return false;
        }
        var m = parser.match(reHtmlTag);
        if (m === null) {
            return false;
        } else {
            var node = new HtmlNode('html_inline');
            node.literal = m;
            block.appendChild(node);
            return true;
        }
    }
}
