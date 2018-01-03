"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InParser_1 = require("./InParser");
//import {Node} from "./Node";
var reEllipses = /\.\.\./g;
var reDash = /--+/g;
// Matches a string of non-special characters.
var reMain = /^[^\n`\[\]\\!<&*_'"]+/m;
class StringParser extends InParser_1.InParser {
    constructor(smart) {
        super();
        this.smart = smart;
    }
    // Parse a run of ordinary characters, or a single character with
    // a special meaning in markdown, as a plain string.
    parse(parser, block) {
        var m;
        if ((m = parser.match(reMain))) {
            if (this.smart) {
                block.appendChild(parser.text(m.replace(reEllipses, "\u2026")
                    .replace(reDash, function (chars) {
                    var enCount = 0;
                    var emCount = 0;
                    if (chars.length % 3 === 0) {
                        emCount = chars.length / 3;
                    }
                    else if (chars.length % 2 === 0) {
                        enCount = chars.length / 2;
                    }
                    else if (chars.length % 3 === 2) {
                        enCount = 1;
                        emCount = (chars.length - 2) / 3;
                    }
                    else {
                        enCount = 2;
                        emCount = (chars.length - 4) / 3;
                    }
                    return "\u2014".repeat(emCount) + "\u2013".repeat(enCount);
                })));
            }
            else {
                block.appendChild(parser.text(m));
            }
            return true;
        }
        else {
            return false;
        }
    }
}
exports.StringParser = StringParser;
//# sourceMappingURL=StringParser.js.map