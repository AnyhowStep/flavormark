"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("../../InlineParser");
const common_1 = require("../../common");
const LinkNode_1 = require("./LinkNode");
const C_LESSTHAN = 60;
const reEmailAutolink = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
class EmailAutolinkParser extends InlineParser_1.InlineParser {
    parse(parser, node) {
        if (parser.peek() != C_LESSTHAN) {
            return false;
        }
        const m = parser.match(reEmailAutolink);
        if (m == undefined) {
            return false;
        }
        const dest = m.slice(1, m.length - 1);
        const link = new LinkNode_1.LinkNode('link');
        link.destination = common_1.normalizeURI('mailto:' + dest);
        link.title = '';
        link.appendChild(parser.text(dest));
        node.appendChild(link);
        return true;
    }
}
exports.EmailAutolinkParser = EmailAutolinkParser;
//# sourceMappingURL=EmailAutolinkParser.js.map