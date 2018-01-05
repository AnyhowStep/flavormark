import {InParser} from "./InParser";
import {InlineContentParser} from "../InlineContentParser";
import {Node} from "../Node";
//import {Node} from "./Node";

export class SmartStringParser extends InParser {
    // Parse a run of ordinary characters, or a single character with
    // a special meaning in markdown, as a plain string.
    public parse (parser : InlineContentParser, block : Node) : boolean {
        var m;
        if ((m = parser.match(/^\.\.\./))) {
            block.appendChild(parser.text("\u2026"));
            return true;
        } else if ((m = parser.match(/^--+/))) {
            var enCount = 0;
            var emCount = 0;
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
            m = "\u2014".repeat(emCount) + "\u2013".repeat(enCount);
            block.appendChild(parser.text(m));
            return true;
        }
        return false;
    }
}
