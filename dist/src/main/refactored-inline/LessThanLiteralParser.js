"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InParser_1 = require("../InParser");
//import {Node} from "./Node";
const from_code_point_1 = require("../from-code-point");
var C_LESSTHAN = 60;
class LessThanLiteralParser extends InParser_1.InParser {
    // Needed so we don't parse this character in StringParser
    parse(parser, block) {
        const c = parser.peek();
        if (c != C_LESSTHAN) {
            return false;
        }
        parser.pos += 1;
        block.appendChild(parser.text(from_code_point_1.fromCodePoint(c)));
        return true;
    }
}
exports.LessThanLiteralParser = LessThanLiteralParser;
//# sourceMappingURL=LessThanLiteralParser.js.map