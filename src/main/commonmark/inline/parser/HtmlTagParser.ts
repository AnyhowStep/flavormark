import {InlineParser} from "./../../../InlineParser";
import {InlineContentParser} from "./../../../InlineContentParser";
import {Node} from "./../../../Node";
import {reHtmlTag} from "./../../../common";
import {HtmlTagNode} from "./../node/HtmlTagNode";

const C_LESSTHAN = 60;

export class HtmlTagParser extends InlineParser {
    public parse (parser : InlineContentParser, node : Node) : boolean {
        const c = parser.peek();
        if (c != C_LESSTHAN) {
            return false;
        }
        const m = parser.match(reHtmlTag);
        if (m == undefined) {
            return false;
        }
        const htmlTag = new HtmlTagNode('html_inline');
        htmlTag.literal = m;
        node.appendChild(htmlTag);
        return true;
    }
}
