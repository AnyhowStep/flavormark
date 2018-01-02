import {InlineParser} from "../inlines";
import {normalizeURI, unescapeString, ESCAPABLE} from "../common";
import {fromCodePoint} from "../from-code-point";
import {normalizeReference} from "../normalize-reference";
import {RegexStream} from "./RegexStream";

var C_BACKSLASH = 92;
var C_OPEN_PAREN = 40;
var C_CLOSE_PAREN = 41;
var ESCAPED_CHAR = '\\\\' + ESCAPABLE;

var C_COLON = 58;

var reSpaceAtEndOfLine = /^ *(?:\n|$)/;

var reLinkTitle = new RegExp(
    '^(?:"(' + ESCAPED_CHAR + '|[^"\\x00])*"' +
        '|' +
        '\'(' + ESCAPED_CHAR + '|[^\'\\x00])*\'' +
        '|' +
        '\\((' + ESCAPED_CHAR + '|[^)\\x00])*\\))');



        var reLinkDestinationBraces = new RegExp(
            '^(?:[<](?:[^ <>\\t\\n\\\\\\x00]' + '|' + ESCAPED_CHAR + '|' + '\\\\)*[>])');

            var reWhitespaceChar = /^[ \t\n\x0b\x0c\x0d]/;
            var reLinkLabel = new RegExp('^\\[(?:[^\\\\\\[\\]]|' + ESCAPED_CHAR +
              '|\\\\){0,1000}\\]');

// Attempt to parse link title (sans quotes), returning the string
// or null if no match.
export function parseLinkTitle (parser : RegexStream|InlineParser) {
    var title = parser.match(reLinkTitle);
    if (title === null) {
        return null;
    } else {
        // chop off quotes from title and unescape:
        return unescapeString(title.substr(1, title.length - 2));
    }
}

// Attempt to parse link destination, returning the string or
// null if no match.
export function parseLinkDestination(parser : RegexStream|InlineParser) {
    var res = parser.match(reLinkDestinationBraces);
    if (res === null) {
        // TODO handrolled parser; res should be null or the string
        var savepos = parser.pos;
        var openparens = 0;
        var c;
        while ((c = parser.peek()) !== -1) {
            if (c === C_BACKSLASH) {
                parser.pos += 1;
                if (parser.peek() !== -1) {
                    parser.pos += 1;
                }
            } else if (c === C_OPEN_PAREN) {
                parser.pos += 1;
                openparens += 1;
            } else if (c === C_CLOSE_PAREN) {
                if (openparens < 1) {
                    break;
                } else {
                    parser.pos += 1;
                    openparens -= 1;
                }
            } else if (reWhitespaceChar.exec(fromCodePoint(c)) !== null) {
                break;
            } else {
                parser.pos += 1;
            }
        }
        res = parser.subject.substr(savepos, parser.pos - savepos);
        return normalizeURI(unescapeString(res));
    } else {  // chop off surrounding <..>:
        return normalizeURI(unescapeString(res.substr(1, res.length - 2)));
    }
};


// Attempt to parse a link label, returning number of characters parsed.
export function parseLinkLabel(parser : RegexStream|InlineParser) {
    var m = parser.match(reLinkLabel);
    // Note:  our regex will allow something of form [..\];
    // we disallow it here rather than using lookahead in the regex:
    if (m === null || m.length > 1001 || /[^\\]\\\]$/.exec(m)) {
        return 0;
    } else {
        return m.length;
    }
};
import {RefMap} from "./RefMap";

// Attempt to parse a link reference, modifying refmap.
export function parseReference(s : string|null, refmap : RefMap) {
    if (s == null) {
        return;
    }
    const parser = new RegexStream(s);
    var rawlabel;
    var dest;
    var title;
    var matchChars;
    var startpos = parser.pos;

    // label:
    matchChars = parseLinkLabel(parser);
    if (matchChars === 0) {
        return 0;
    } else {
        rawlabel = parser.subject.substr(0, matchChars);
    }

    // colon:
    if (parser.peek() === C_COLON) {
        parser.pos++;
    } else {
        parser.pos = startpos;
        return 0;
    }

    //  link url
    parser.spnl();

    dest = parseLinkDestination(parser);
    if (dest === null || dest.length === 0) {
        parser.pos = startpos;
        return 0;
    }

    var beforetitle = parser.pos;
    parser.spnl();
    title = parseLinkTitle(parser);
    if (title === null) {
        title = '';
        // rewind before spaces
        parser.pos = beforetitle;
    }

    // make sure we're at line end:
    var atLineEnd = true;
    if (parser.match(reSpaceAtEndOfLine) === null) {
        if (title === '') {
            atLineEnd = false;
        } else {
            // the potential title we found is not at the line end,
            // but it could still be a legal link reference if we
            // discard the title
            title = '';
            // rewind before spaces
            parser.pos = beforetitle;
            // and instead check if the link URL is at the line end
            atLineEnd = parser.match(reSpaceAtEndOfLine) !== null;
        }
    }

    if (!atLineEnd) {
        parser.pos = startpos;
        return 0;
    }

    var normlabel = normalizeReference(rawlabel);
    if (normlabel === '') {
        // label must contain non-whitespace characters
        parser.pos = startpos;
        return 0;
    }

    if (!refmap[normlabel]) {
        refmap[normlabel] = { destination: dest, title: title };
    }
    return parser.pos - startpos;
};
