import {InParser} from "./InParser";
import {InlineParser} from "../inlines";
import {Node} from "../node";
//import {Node} from "./Node";

var reEllipses = /\.\.\./g;

var reDash = /--+/g;

// Matches a string of non-special characters.
var reMain = /^[^\n`\[\]\\!<&*_'"]+/m;

export class StringParser extends InParser {
    private smart : boolean|undefined;
    public constructor (smart? : boolean) {
        super();
        this.smart = smart;
    }
    // Parse a run of ordinary characters, or a single character with
    // a special meaning in markdown, as a plain string.
    public parse (parser : InlineParser, block : Node) : boolean {
        var m;
        if ((m = parser.match(reMain))) {
            if (this.smart) {
                block.appendChild(parser.text(
                    m.replace(reEllipses, "\u2026")
                        .replace(reDash, function(chars : string) {
                            var enCount = 0;
                            var emCount = 0;
                            if (chars.length % 3 === 0) { // If divisible by 3, use all em dashes
                                emCount = chars.length / 3;
                            } else if (chars.length % 2 === 0) { // If divisible by 2, use all en dashes
                                enCount = chars.length / 2;
                            } else if (chars.length % 3 === 2) { // If 2 extra dashes, use en dash for last 2; em dashes for rest
                                enCount = 1;
                                emCount = (chars.length - 2) / 3;
                            } else { // Use en dashes for last 4 hyphens; em dashes for rest
                                enCount = 2;
                                emCount = (chars.length - 4) / 3;
                            }
                            return "\u2014".repeat(emCount) + "\u2013".repeat(enCount);
                        })));
            } else {
                block.appendChild(parser.text(m));
            }
            return true;
        } else {
            return false;
        }
    }
}
