import {Node} from "./node";
import * as common from "./common";
import {normalizeReference} from "./normalize-reference";
import {fromCodePoint} from "./from-code-point";
var normalizeURI = common.normalizeURI;
var unescapeString = common.unescapeString;
import {BlockParser} from "./refactored/BlockParser";
import {BlockNode} from "./refactored/BlockNode";

// Constants for character codes:

var C_ASTERISK = 42;
var C_UNDERSCORE = 95;
var C_BACKSLASH = 92;
var C_OPEN_PAREN = 40;
var C_CLOSE_PAREN = 41;
var C_COLON = 58;
var C_SINGLEQUOTE = 39;
var C_DOUBLEQUOTE = 34;
// Some regexps used in inline parser:
var ESCAPABLE = common.ESCAPABLE;
var ESCAPED_CHAR = '\\\\' + ESCAPABLE;

var rePunctuation = new RegExp(/[!"#$%&'()*+,\-./:;<=>?@\[\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/);

var reLinkTitle = new RegExp(
    '^(?:"(' + ESCAPED_CHAR + '|[^"\\x00])*"' +
        '|' +
        '\'(' + ESCAPED_CHAR + '|[^\'\\x00])*\'' +
        '|' +
        '\\((' + ESCAPED_CHAR + '|[^)\\x00])*\\))');

var reLinkDestinationBraces = new RegExp(
    '^(?:[<](?:[^ <>\\t\\n\\\\\\x00]' + '|' + ESCAPED_CHAR + '|' + '\\\\)*[>])');

var reSpnl = /^ *(?:\n *)?/;

var reWhitespaceChar = /^[ \t\n\x0b\x0c\x0d]/;

var reUnicodeWhitespaceChar = /^\s/;

var reSpaceAtEndOfLine = /^ *(?:\n|$)/;

var reLinkLabel = new RegExp('^\\[(?:[^\\\\\\[\\]]|' + ESCAPED_CHAR +
  '|\\\\){0,1000}\\]');

import {InParser} from "./refactored-inline/InParser";
import {NewlineParser} from "./refactored-inline/NewlineParser";
import {BackslashParser} from "./refactored-inline/BackslashParser";
import {BacktickParser} from "./refactored-inline/BacktickParser";
import {DelimParser} from "./refactored-inline/DelimParser";
import {OpenBracketParser} from "./refactored-inline/OpenBracketParser";
import {BangParser} from "./refactored-inline/BangParser";
import {CloseBracketParser} from "./refactored-inline/CloseBracketParser";
import {AutolinkParser} from "./refactored-inline/AutolinkParser";
import {HtmlTagParser} from "./refactored-inline/HtmlTagParser";
import {LessThanLiteralParser} from "./refactored-inline/LessThanLiteralParser";
import {EntityParser} from "./refactored-inline/EntityParser";
import {StringParser} from "./refactored-inline/StringParser";
const inParsers : InParser[] = [
    new NewlineParser(),
    new BackslashParser(),
    new BacktickParser(),
    new DelimParser(),
    new OpenBracketParser(),
    new BangParser(),
    new CloseBracketParser(),
    new AutolinkParser(),
    new HtmlTagParser(),
    new LessThanLiteralParser(),
    new EntityParser(),

    new StringParser(), //Should this be a default parser that cannot be removed?
];

function text(s : string) {
    var node = new Node('text');
    node.literal = s;
    return node;
};
function removeDelimitersBetween(bottom : Delimiter|null, top : Delimiter) {
    if (bottom && bottom.next !== top) {
        bottom.next = top;
        top.previous = bottom;
    }
};
import {DelimiterCollection, Delimiter} from "./refactored-misc/DelimiterCollection";
export interface Bracket {
    node: Node,
    previous: Bracket|null,
    previousDelimiter: Delimiter|null,
    index: number,
    image: boolean,
    active: boolean,
    bracketAfter? : boolean
}

export interface Options {
    smart? : boolean
}

export type RefMap = {
    [k : string] : undefined|{ destination: string, title: string }
}

export class InlineParser {
    subject : string = '';
    delimiters = new DelimiterCollection();
    brackets: null|Bracket;
    pos = 0;
    refmap : RefMap = {};
    options : Options;
    constructor (options : undefined|Options) {
        this.options = options || {};
    }

    // INLINE PARSER

    // These are methods of an InlineParser object, defined below.
    // An InlineParser keeps track of a subject (a string to be
    // parsed) and a position in that subject.

    // If re matches at current position in the subject, advance
    // position in subject and return the match; otherwise return null.
    match(re : RegExp) {
        var m = re.exec(this.subject.slice(this.pos));
        if (m === null) {
            return null;
        } else {
            this.pos += m.index + m[0].length;
            return m[0];
        }
    };

    // Returns the code for the character at the current subject position, or -1
    // there are no more characters.
    peek() {
        if (this.pos < this.subject.length) {
            return this.subject.charCodeAt(this.pos);
        } else {
            return -1;
        }
    };

    text (s : string) {
        return text(s);
    }

    // Parse zero or more space characters, including at most one newline
    spnl() {
        this.match(reSpnl);
        return true;
    };

    // Scan a sequence of characters with code cc, and return information about
    // the number of delimiters and whether they are positioned such that
    // they can open and/or close emphasis or strong emphasis.  A utility
    // function for strong/emph parsing.
    scanDelims(cc : number) {
        var numdelims = 0;
        var char_before, char_after, cc_after;
        var startpos = this.pos;
        var left_flanking, right_flanking, can_open, can_close;
        var after_is_whitespace, after_is_punctuation, before_is_whitespace, before_is_punctuation;

        if (cc === C_SINGLEQUOTE || cc === C_DOUBLEQUOTE) {
            numdelims++;
            this.pos++;
        } else {
            while (this.peek() === cc) {
                numdelims++;
                this.pos++;
            }
        }

        if (numdelims === 0) {
            return null;
        }

        char_before = startpos === 0 ? '\n' : this.subject.charAt(startpos - 1);

        cc_after = this.peek();
        if (cc_after === -1) {
            char_after = '\n';
        } else {
            char_after = fromCodePoint(cc_after);
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
        } else if (cc === C_SINGLEQUOTE || cc === C_DOUBLEQUOTE) {
            can_open = left_flanking && !right_flanking;
            can_close = right_flanking;
        } else {
            can_open = left_flanking;
            can_close = right_flanking;
        }
        this.pos = startpos;
        return { numdelims: numdelims,
                 can_open: can_open,
                 can_close: can_close };
    };

    processEmphasis(stack_bottom : Delimiter|null) {
        var opener, closer, old_closer;
        var opener_inl, closer_inl;
        var tempstack;
        var use_delims;
        var tmp, next;
        var opener_found;
        var openers_bottom = [];
        var odd_match = false;

        openers_bottom[C_UNDERSCORE] = stack_bottom;
        openers_bottom[C_ASTERISK] = stack_bottom;
        openers_bottom[C_SINGLEQUOTE] = stack_bottom;
        openers_bottom[C_DOUBLEQUOTE] = stack_bottom;

        // find first closer above stack_bottom:
        closer = this.delimiters.peek();
        while (closer !== null && closer.previous !== stack_bottom) {
            closer = closer.previous;
        }
        // move forward, looking for closers, and handling each
        while (closer !== null) {
            var closercc = closer.cc;
            if (!closer.can_close) {
                closer = closer.next;
            } else {
                // found emphasis closer. now look back for first matching opener:
                opener = closer.previous;
                opener_found = false;
                while (opener !== null && opener !== stack_bottom &&
                       opener !== openers_bottom[closercc]) {
                    odd_match = (closer.can_open || opener.can_close) &&
                        (opener.origdelims + closer.origdelims) % 3 === 0;
                    if (opener.cc === closer.cc && opener.can_open && !odd_match) {
                        opener_found = true;
                        break;
                    }
                    opener = opener.previous;
                }
                old_closer = closer;

                if (closercc === C_ASTERISK || closercc === C_UNDERSCORE) {
                    if (!opener_found) {
                        closer = closer.next;
                    } else {
                        if (opener == null) {
                            throw new Error("opener cannot be null");
                        }
                        // calculate actual number of delimiters used from closer
                        use_delims =
                          (closer.numdelims >= 2 && opener.numdelims >= 2) ? 2 : 1;

                        opener_inl = opener.node;
                        closer_inl = closer.node;

                        if (opener_inl == null) {
                            throw new Error("opener_inl cannot be null");
                        }
                        if (opener_inl.literal == null) {
                            throw new Error("opener_inl.literal cannot be null");
                        }
                        // remove used delimiters from stack elts and inlines
                        opener.numdelims -= use_delims;
                        closer.numdelims -= use_delims;
                        opener_inl.literal =
                            opener_inl.literal.slice(0,
                                                      opener_inl.literal.length - use_delims);

                        if (closer_inl.literal == null) {
                            throw new Error("closer_inl.literal cannot be null");
                        }
                        closer_inl.literal =
                            closer_inl.literal.slice(0,
                                                      closer_inl.literal.length - use_delims);

                        // build contents for new emph element
                        var emph = new Node(use_delims === 1 ? 'emph' : 'strong');

                        tmp = opener_inl.next;
                        while (tmp && tmp !== closer_inl) {
                            next = tmp.next;
                            tmp.unlink();
                            emph.appendChild(tmp);
                            tmp = next;
                        }

                        opener_inl.insertAfter(emph);

                        // remove elts between opener and closer in delimiters stack
                        removeDelimitersBetween(opener, closer);

                        // if opener has 0 delims, remove it and the inline
                        if (opener.numdelims === 0) {
                            opener_inl.unlink();
                            this.delimiters.remove(opener);
                        }

                        if (closer.numdelims === 0) {
                            closer_inl.unlink();
                            tempstack = closer.next;
                            this.delimiters.remove(closer);
                            closer = tempstack;
                        }

                    }

                } else if (closercc === C_SINGLEQUOTE) {
                    closer.node.literal = "\u2019";
                    if (opener_found) {
                        if (opener == null) {
                            throw new Error("opener cannot be null");
                        }
                        opener.node.literal = "\u2018";
                    }
                    closer = closer.next;

                } else if (closercc === C_DOUBLEQUOTE) {
                    closer.node.literal = "\u201D";
                    if (opener_found) {
                        if (opener == null) {
                            throw new Error("opener cannot be null");
                        }
                        opener.node.literal = "\u201C";
                    }
                    closer = closer.next;

                }
                if (!opener_found && !odd_match) {
                    // Set lower bound for future searches for openers:
                    // We don't do this with odd_match because a **
                    // that doesn't match an earlier * might turn into
                    // an opener, and the * might be matched by something
                    // else.
                    openers_bottom[closercc] = old_closer.previous;
                    if (!old_closer.can_open) {
                        // We can remove a closer that can't be an opener,
                        // once we've seen there's no matching opener:
                        this.delimiters.remove(old_closer);
                    }
                }
            }

        }

        // remove all delimiters
        while (this.delimiters.peek() !== null && this.delimiters.peek() !== stack_bottom) {
            this.delimiters.remove(this.delimiters.peek());
        }
    };

    // Attempt to parse link title (sans quotes), returning the string
    // or null if no match.
    parseLinkTitle() {
        var title = this.match(reLinkTitle);
        if (title === null) {
            return null;
        } else {
            // chop off quotes from title and unescape:
            return unescapeString(title.substr(1, title.length - 2));
        }
    };

    // Attempt to parse link destination, returning the string or
    // null if no match.
    parseLinkDestination() {
        var res = this.match(reLinkDestinationBraces);
        if (res === null) {
            // TODO handrolled parser; res should be null or the string
            var savepos = this.pos;
            var openparens = 0;
            var c;
            while ((c = this.peek()) !== -1) {
                if (c === C_BACKSLASH) {
                    this.pos += 1;
                    if (this.peek() !== -1) {
                        this.pos += 1;
                    }
                } else if (c === C_OPEN_PAREN) {
                    this.pos += 1;
                    openparens += 1;
                } else if (c === C_CLOSE_PAREN) {
                    if (openparens < 1) {
                        break;
                    } else {
                        this.pos += 1;
                        openparens -= 1;
                    }
                } else if (reWhitespaceChar.exec(fromCodePoint(c)) !== null) {
                    break;
                } else {
                    this.pos += 1;
                }
            }
            res = this.subject.substr(savepos, this.pos - savepos);
            return normalizeURI(unescapeString(res));
        } else {  // chop off surrounding <..>:
            return normalizeURI(unescapeString(res.substr(1, res.length - 2)));
        }
    };

    // Attempt to parse a link label, returning number of characters parsed.
    parseLinkLabel() {
        var m = this.match(reLinkLabel);
        // Note:  our regex will allow something of form [..\];
        // we disallow it here rather than using lookahead in the regex:
        if (m === null || m.length > 1001 || /[^\\]\\\]$/.exec(m)) {
            return 0;
        } else {
            return m.length;
        }
    };

    // Attempt to parse a link reference, modifying refmap.
    parseReference(s : string|null, refmap : RefMap) {
        if (s == null) {
            return;
        }
        this.subject = s;
        this.pos = 0;
        var rawlabel;
        var dest;
        var title;
        var matchChars;
        var startpos = this.pos;

        // label:
        matchChars = this.parseLinkLabel();
        if (matchChars === 0) {
            return 0;
        } else {
            rawlabel = this.subject.substr(0, matchChars);
        }

        // colon:
        if (this.peek() === C_COLON) {
            this.pos++;
        } else {
            this.pos = startpos;
            return 0;
        }

        //  link url
        this.spnl();

        dest = this.parseLinkDestination();
        if (dest === null || dest.length === 0) {
            this.pos = startpos;
            return 0;
        }

        var beforetitle = this.pos;
        this.spnl();
        title = this.parseLinkTitle();
        if (title === null) {
            title = '';
            // rewind before spaces
            this.pos = beforetitle;
        }

        // make sure we're at line end:
        var atLineEnd = true;
        if (this.match(reSpaceAtEndOfLine) === null) {
            if (title === '') {
                atLineEnd = false;
            } else {
                // the potential title we found is not at the line end,
                // but it could still be a legal link reference if we
                // discard the title
                title = '';
                // rewind before spaces
                this.pos = beforetitle;
                // and instead check if the link URL is at the line end
                atLineEnd = this.match(reSpaceAtEndOfLine) !== null;
            }
        }

        if (!atLineEnd) {
            this.pos = startpos;
            return 0;
        }

        var normlabel = normalizeReference(rawlabel);
        if (normlabel === '') {
            // label must contain non-whitespace characters
            this.pos = startpos;
            return 0;
        }

        if (!refmap[normlabel]) {
            refmap[normlabel] = { destination: dest, title: title };
        }
        return this.pos - startpos;
    };


    addBracket (node : Node, index : number, image : boolean) {
        if (this.brackets !== null) {
            this.brackets.bracketAfter = true;
        }
        this.brackets = { node: node,
                          previous: this.brackets,
                          previousDelimiter: this.delimiters.peek(),
                          index: index,
                          image: image,
                          active: true };
    };

    removeBracket () {
        if (this.brackets == null) {
            throw new Error("Removed more than we added");
        }
        this.brackets = this.brackets.previous;
    };



    // Parse the next inline element in subject, advancing subject position.
    // On success, add the result to block's children and return true.
    // On failure, return false.
    parseInline (block : BlockNode) {
        var c = this.peek();
        if (c === -1) {
            return false;
        }
        for (let p of inParsers) {
            if (p.parse(this, block)) {
                return true;
            }
        }
        this.pos += 1;
        block.appendChild(text(fromCodePoint(c)));
        return true;
    };

    // Parse string content in block into inline children,
    // using refmap to resolve references.
    parse (blockParser : BlockParser, block : BlockNode) {
        this.subject = (blockParser.getString(block)).trim();
        this.pos = 0;
        this.delimiters = new DelimiterCollection();
        this.brackets = null;
        while (this.parseInline(block)) {
        }
        blockParser.unsetString(block); // allow raw string to be garbage collected
        this.processEmphasis(null);
    }
}
