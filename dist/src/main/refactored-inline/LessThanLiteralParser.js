"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("../InlineParser");
//import {Node} from "./Node";
const from_code_point_1 = require("../from-code-point");
var C_LESSTHAN = 60;
class LessThanLiteralParser extends InlineParser_1.InlineParser {
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