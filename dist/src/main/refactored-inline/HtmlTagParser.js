"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("../InlineParser");
//import {Node} from "./Node";
const common_1 = require("../common");
const HtmlNode_1 = require("./HtmlNode");
var C_LESSTHAN = 60;
class HtmlTagParser extends InlineParser_1.InlineParser {
    // Attempt to parse a raw HTML tag.
    parse(parser, block) {
        const c = parser.peek();
        if (c != C_LESSTHAN) {
            return false;
        }
        var m = parser.match(common_1.reHtmlTag);
        if (m == null) {
            return false;
        }
        else {
            var node = new HtmlNode_1.HtmlNode('html_inline');
            node.literal = m;
            block.appendChild(node);
            return true;
        }
    }
}
exports.HtmlTagParser = HtmlTagParser;
//# sourceMappingURL=HtmlTagParser.js.map