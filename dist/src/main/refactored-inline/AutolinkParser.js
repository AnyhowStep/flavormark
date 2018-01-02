"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InParser_1 = require("./InParser");
const InlineNode_1 = require("./InlineNode");
const common_1 = require("../common");
var C_LESSTHAN = 60;
var reEmailAutolink = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
var reAutolink = /^<[A-Za-z][A-Za-z0-9.+-]{1,31}:[^<>\x00-\x20]*>/i;
class AutolinkParser extends InParser_1.InParser {
    // Attempt to parse an autolink (URL or email in pointy brackets).
    parse(parser, block) {
        const c = parser.peek();
        if (c != C_LESSTHAN) {
            return false;
        }
        var m;
        var dest;
        var node;
        if ((m = parser.match(reEmailAutolink))) {
            dest = m.slice(1, m.length - 1);
            node = new InlineNode_1.InlineNode('link');
            node.destination = common_1.normalizeURI('mailto:' + dest);
            node.title = '';
            node.appendChild(parser.text(dest));
            block.appendChild(node);
            return true;
        }
        else if ((m = parser.match(reAutolink))) {
            dest = m.slice(1, m.length - 1);
            node = new InlineNode_1.InlineNode('link');
            node.destination = common_1.normalizeURI(dest);
            node.title = '';
            node.appendChild(parser.text(dest));
            block.appendChild(node);
            return true;
        }
        else {
            return false;
        }
    }
}
exports.AutolinkParser = AutolinkParser;
//# sourceMappingURL=AutolinkParser.js.map