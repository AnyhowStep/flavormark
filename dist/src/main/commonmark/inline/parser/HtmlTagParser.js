"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("./../../../InlineParser");
const common_1 = require("./../../../common");
const HtmlTagNode_1 = require("./../node/HtmlTagNode");
const C_LESSTHAN = 60;
class HtmlTagParser extends InlineParser_1.InlineParser {
    parse(parser, block) {
        const c = parser.peek();
        if (c != C_LESSTHAN) {
            return false;
        }
        const m = parser.match(common_1.reHtmlTag);
        if (m == undefined) {
            return false;
        }
        const node = new HtmlTagNode_1.HtmlTagNode('html_inline');
        node.literal = m;
        block.appendChild(node);
        return true;
    }
}
exports.HtmlTagParser = HtmlTagParser;
//# sourceMappingURL=HtmlTagParser.js.map