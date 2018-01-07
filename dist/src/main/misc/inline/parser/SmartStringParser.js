"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("./../../../InlineParser");
//TODO Consider factoring this out into ellipsis and dash parser
class SmartStringParser extends InlineParser_1.InlineParser {
    // Parse a run of ordinary characters, or a single character with
    // a special meaning in markdown, as a plain string.
    parse(parser, block) {
        {
            const m = parser.match(/^\.\.\./);
            if (m != undefined) {
                block.appendChild(parser.text("\u2026"));
                return true;
            }
        }
        {
            const m = parser.match(/^--+/);
            if (m != undefined) {
                let enCount = 0;
                let emCount = 0;
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
                const text = "\u2014".repeat(emCount) + "\u2013".repeat(enCount);
                block.appendChild(parser.text(text));
                return true;
            }
        }
        return false;
    }
}
exports.SmartStringParser = SmartStringParser;
//# sourceMappingURL=SmartStringParser.js.map