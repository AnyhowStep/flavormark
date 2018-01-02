import {InParser} from "./InParser";
import {InlineParser} from "../inlines";
import {BlockNode} from "../refactored/BlockNode";
import {InlineNode} from "./InlineNode";

var C_NEWLINE = 10;

var C_ASTERISK = 42;
var C_UNDERSCORE = 95;
var C_SINGLEQUOTE = 39;
var C_DOUBLEQUOTE = 34;

var reFinalSpace = / *$/;

var reInitialSpace = /^ */;

export class DelimParser extends InParser {
    // Handle a delimiter marker for emphasis or a quote.
    public parse (parser : InlineParser, block : BlockNode) : boolean {
        const cc = parser.peek();
        const isEmphasis = (
            cc == C_ASTERISK ||
            cc == C_UNDERSCORE
        );
        const isSmartQuote = (
            parser.options.smart == true &&
            (
                cc == C_SINGLEQUOTE ||
                cc == C_DOUBLEQUOTE
            )
        );
        if (!isEmphasis && !isSmartQuote) {
            return false;
        }
        var res = parser.scanDelims(cc);
        if (!res) {
            return false;
        }
        var numdelims = res.numdelims;
        var startpos = parser.pos;
        var contents;

        parser.pos += numdelims;
        if (cc === C_SINGLEQUOTE) {
            contents = "\u2019";
        } else if (cc === C_DOUBLEQUOTE) {
            contents = "\u201C";
        } else {
            contents = parser.subject.slice(startpos, parser.pos);
        }
        var node = parser.text(contents);
        block.appendChild(node);

        // Add entry to stack for this opener
        parser.delimiters = { cc: cc,
                            numdelims: numdelims,
                            origdelims: numdelims,
                            node: node,
                            previous: parser.delimiters,
                            next: null,
                            can_open: res.can_open,
                            can_close: res.can_close };
        if (parser.delimiters.previous !== null) {
            parser.delimiters.previous.next = parser.delimiters;
        }

        return true;
    }
}
