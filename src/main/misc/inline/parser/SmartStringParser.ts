import {InlineParser} from "./../../../InlineParser";
import {InlineContentParser} from "./../../../InlineContentParser";
import {Node} from "./../../../Node";

//TODO Consider factoring this out into ellipsis and dash parser
export class SmartStringParser extends InlineParser {
    // Parse a run of ordinary characters, or a single character with
    // a special meaning in markdown, as a plain string.
    public parse (parser : InlineContentParser, block : Node) : boolean {
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
                if (m.length % 3 === 0) { // If divisible by 3, use all em dashes
                    emCount = m.length / 3;
                } else if (m.length % 2 === 0) { // If divisible by 2, use all en dashes
                    enCount = m.length / 2;
                } else if (m.length % 3 === 2) { // If 2 extra dashes, use en dash for last 2; em dashes for rest
                    enCount = 1;
                    emCount = (m.length - 2) / 3;
                } else { // Use en dashes for last 4 hyphens; em dashes for rest
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
