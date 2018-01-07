"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("./../../../InlineParser");
const common_1 = require("./../../../common");
const LinkNode_1 = require("./../node/LinkNode");
const C_LESSTHAN = 60;
const reAutolink = /^<[A-Za-z][A-Za-z0-9.+-]{1,31}:[^<>\x00-\x20]*>/i;
class UriAutolinkParser extends InlineParser_1.InlineParser {
    // Attempt to parse an autolink (URL or email in pointy brackets).
    parse(parser, node) {
        if (parser.peek() != C_LESSTHAN) {
            return false;
        }
        const m = parser.match(reAutolink);
        if (m == undefined) {
            return false;
        }
        const dest = m.slice(1, m.length - 1);
        const link = new LinkNode_1.LinkNode('link');
        link.destination = common_1.normalizeURI(dest);
        link.title = '';
        link.appendChild(parser.text(dest));
        node.appendChild(link);
        return true;
    }
}
exports.UriAutolinkParser = UriAutolinkParser;
//# sourceMappingURL=UriAutolinkParser.js.map