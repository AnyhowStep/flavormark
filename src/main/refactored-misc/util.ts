import {InlineParser} from "../inlines";
import {normalizeURI, unescapeString, ESCAPABLE} from "../common";
import {fromCodePoint} from "../from-code-point";

var C_BACKSLASH = 92;
var C_OPEN_PAREN = 40;
var C_CLOSE_PAREN = 41;
var ESCAPED_CHAR = '\\\\' + ESCAPABLE;

var reLinkTitle = new RegExp(
    '^(?:"(' + ESCAPED_CHAR + '|[^"\\x00])*"' +
        '|' +
        '\'(' + ESCAPED_CHAR + '|[^\'\\x00])*\'' +
        '|' +
        '\\((' + ESCAPED_CHAR + '|[^)\\x00])*\\))');



        var reLinkDestinationBraces = new RegExp(
            '^(?:[<](?:[^ <>\\t\\n\\\\\\x00]' + '|' + ESCAPED_CHAR + '|' + '\\\\)*[>])');

            var reWhitespaceChar = /^[ \t\n\x0b\x0c\x0d]/;

// Attempt to parse link title (sans quotes), returning the string
// or null if no match.
export function parseLinkTitle (parser : InlineParser) {
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
export function parseLinkDestination(parser : InlineParser) {
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
