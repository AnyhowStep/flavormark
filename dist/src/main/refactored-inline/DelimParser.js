"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InParser_1 = require("./InParser");
//import {Node} from "./Node";
const from_code_point_1 = require("../from-code-point");
var C_UNDERSCORE = 95;
var C_SINGLEQUOTE = 39;
var C_DOUBLEQUOTE = 34;
var rePunctuation = new RegExp(/[!"#$%&'()*+,\-./:;<=>?@\[\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/);
var reUnicodeWhitespaceChar = /^\s/;
var C_ASTERISK = 42;
var C_UNDERSCORE = 95;
var C_SINGLEQUOTE = 39;
var C_DOUBLEQUOTE = 34;
// Scan a sequence of characters with code cc, and return information about
// the number of delimiters and whether they are positioned such that
// they can open and/or close emphasis or strong emphasis.  A utility
// function for strong/emph parsing.
function scanDelims(parser, cc) {
    var numdelims = 0;
    var char_before, char_after, cc_after;
    var startpos = parser.pos;
    var left_flanking, right_flanking, can_open, can_close;
    var after_is_whitespace, after_is_punctuation, before_is_whitespace, before_is_punctuation;
    if (cc === C_SINGLEQUOTE || cc === C_DOUBLEQUOTE) {
        numdelims++;
        parser.pos++;
    }
    else {
        while (parser.peek() === cc) {
            numdelims++;
            parser.pos++;
        }
    }
    if (numdelims === 0) {
        return null;
    }
    char_before = startpos === 0 ? '\n' : parser.subject.charAt(startpos - 1);
    cc_after = parser.peek();
    if (cc_after === -1) {
        char_after = '\n';
    }
    else {
        char_after = from_code_point_1.fromCodePoint(cc_after);
    }
    after_is_whitespace = reUnicodeWhitespaceChar.test(char_after);
    after_is_punctuation = rePunctuation.test(char_after);
    before_is_whitespace = reUnicodeWhitespaceChar.test(char_before);
    before_is_punctuation = rePunctuation.test(char_before);
    left_flanking = !after_is_whitespace &&
        (!after_is_punctuation || before_is_whitespace || before_is_punctuation);
    right_flanking = !before_is_whitespace &&
        (!before_is_punctuation || after_is_whitespace || after_is_punctuation);
    if (cc === C_UNDERSCORE) {
        can_open = left_flanking &&
            (!right_flanking || before_is_punctuation);
        can_close = right_flanking &&
            (!left_flanking || after_is_punctuation);
    }
    else if (cc === C_SINGLEQUOTE || cc === C_DOUBLEQUOTE) {
        can_open = left_flanking && !right_flanking;
        can_close = right_flanking;
    }
    else {
        can_open = left_flanking;
        can_close = right_flanking;
    }
    parser.pos = startpos;
    return { numdelims: numdelims,
        can_open: can_open,
        can_close: can_close };
}
;
class DelimParser extends InParser_1.InParser {
    constructor(delimiters, smart) {
        super();
        this.delimiters = delimiters;
        this.smart = smart;
    }
    reinit() {
        this.delimiters.clear();
    }
    // Handle a delimiter marker for emphasis or a quote.
    parse(parser, block) {
        const cc = parser.peek();
        const isEmphasis = (cc == C_ASTERISK ||
            cc == C_UNDERSCORE);
        const isSmartQuote = (this.smart == true &&
            (cc == C_SINGLEQUOTE ||
                cc == C_DOUBLEQUOTE));
        if (!isEmphasis && !isSmartQuote) {
            return false;
        }
        var res = scanDelims(parser, cc);
        if (!res) {
            return false;
        }
        var numdelims = res.numdelims;
        var startpos = parser.pos;
        var contents;
        parser.pos += numdelims;
        if (cc === C_SINGLEQUOTE) {
            contents = "\u2019";
        }
        else if (cc === C_DOUBLEQUOTE) {
            contents = "\u201C";
        }
        else {
            contents = parser.subject.slice(startpos, parser.pos);
        }
        var node = parser.text(contents);
        block.appendChild(node);
        // Add entry to stack for this opener
        this.delimiters.push({
            cc: cc,
            numdelims: numdelims,
            origdelims: numdelims,
            node: node,
            can_open: res.can_open,
            can_close: res.can_close
        });
        return true;
    }
}
exports.DelimParser = DelimParser;
//# sourceMappingURL=DelimParser.js.map