"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InParser_1 = require("./InParser");
//import {Node} from "./Node";
class SmartStringParser extends InParser_1.InParser {
    // Parse a run of ordinary characters, or a single character with
    // a special meaning in markdown, as a plain string.
    parse(parser, block) {
        var m;
        if ((m = parser.match(/^\.\.\./))) {
            block.appendChild(parser.text("\u2026"));
            return true;
        }
        else if ((m = parser.match(/^--+/))) {
            var enCount = 0;
            var emCount = 0;
            if (m.length % 3 === 0) {
                emCount = m.length / 3;
            }
            else if (m.length % 2 === 0) {
                enCount = m.length / 2;
            }
            else if (m.length % 3 === 2) {
                enCount = 1;
                emCount = (m.length - 2) / 3;
            }
            else {
                enCount = 2;
                emCount = (m.length - 4) / 3;
            }
            m = "\u2014".repeat(emCount) + "\u2013".repeat(enCount);
            block.appendChild(parser.text(m));
            return true;
        }
        return false;
    }
}
exports.SmartStringParser = SmartStringParser;
//# sourceMappingURL=SmartStringParser.js.map