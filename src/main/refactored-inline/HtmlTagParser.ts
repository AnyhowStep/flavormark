import {InParser} from "./InParser";
import {InlineParser} from "../inlines";
import {BlockNode} from "../refactored/BlockNode";
import {InlineNode} from "./InlineNode";
import {reHtmlTag} from "../common";

var C_LESSTHAN = 60;


export class HtmlTagParser extends InParser {
    // Attempt to parse a raw HTML tag.
    public parse (parser : InlineParser, block : BlockNode) : boolean {
        const c = parser.peek();
        if (c != C_LESSTHAN) {
            return false;
        }
        var m = parser.match(reHtmlTag);
        if (m === null) {
            return false;
        } else {
            var node = new InlineNode('html_inline');
            node.literal = m;
            block.appendChild(node);
            return true;
        }
    }
}
