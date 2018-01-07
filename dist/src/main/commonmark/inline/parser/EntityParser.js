"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("./../../../InlineParser");
const common_1 = require("./../../../common");
const entities_1 = require("entities");
const C_AMPERSAND = 38;
const reEntityHere = new RegExp('^' + common_1.ENTITY, 'i');
class EntityParser extends InlineParser_1.InlineParser {
    parse(parser, node) {
        const c = parser.peek();
        if (c != C_AMPERSAND) {
            return false;
        }
        const m = parser.match(reEntityHere);
        if (m == undefined) {
            return false;
        }
        node.appendChild(parser.text(entities_1.decodeHTML(m)));
        return true;
    }
}
exports.EntityParser = EntityParser;
//# sourceMappingURL=EntityParser.js.map