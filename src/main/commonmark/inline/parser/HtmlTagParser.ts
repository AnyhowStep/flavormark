import {InlineParser} from "./../../../InlineParser";
import {InlineContentParser} from "./../../../InlineContentParser";
import {Node} from "./../../../Node";
import {reHtmlTag} from "./../../../common";
import {HtmlTagNode} from "./../node/HtmlTagNode";

const C_LESSTHAN = 60;

export class HtmlTagParser extends InlineParser {
    public parse (parser : InlineContentParser, block : Node) : boolean {
        const c = parser.peek();
        if (c != C_LESSTHAN) {
            return false;
        }
        const m = parser.match(reHtmlTag);
        if (m == undefined) {
            return false;
        }
        const node = new HtmlTagNode('html_inline');
        node.literal = m;
        block.appendChild(node);
        return true;
    }
}
