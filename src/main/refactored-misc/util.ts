import {InlineParser} from "../inlines";
import {unescapeString, ESCAPABLE} from "../common";

var ESCAPED_CHAR = '\\\\' + ESCAPABLE;

var reLinkTitle = new RegExp(
    '^(?:"(' + ESCAPED_CHAR + '|[^"\\x00])*"' +
        '|' +
        '\'(' + ESCAPED_CHAR + '|[^\'\\x00])*\'' +
        '|' +
        '\\((' + ESCAPED_CHAR + '|[^)\\x00])*\\))');


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
