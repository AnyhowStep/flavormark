"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InParser_1 = require("../InParser");
//import {Node} from "./Node";
const common_1 = require("../common");
const entities_1 = require("entities");
var C_AMPERSAND = 38;
var reEntityHere = new RegExp('^' + common_1.ENTITY, 'i');
class EntityParser extends InParser_1.InParser {
    // Attempt to parse an entity.
    parse(parser, block) {
        const c = parser.peek();
        if (c != C_AMPERSAND) {
            return false;
        }
        var m;
        if ((m = parser.match(reEntityHere))) {
            block.appendChild(parser.text(entities_1.decodeHTML(m)));
            return true;
        }
        else {
            return false;
        }
    }
}
exports.EntityParser = EntityParser;
//# sourceMappingURL=EntityParser.js.map