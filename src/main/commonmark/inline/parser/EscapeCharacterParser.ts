import {InlineParser} from "./../../../InlineParser";
import {InlineContentParser} from "./../../../InlineContentParser";
import {Node} from "./../../../Node";
import {ESCAPABLE} from "./../../../common";
import {HardbreakNode} from "./../node/HardbreakNode";

const C_NEWLINE = 10;
const C_BACKSLASH = 92;

const reEscapable = new RegExp('^' + ESCAPABLE);

export class EscapeCharacterParser extends InlineParser {
    public parse (parser : InlineContentParser, node : Node) : boolean {
        const c = parser.peek();
        if (c != C_BACKSLASH) {
            return false;
        }

        const subj = parser.subject;
        ++parser.pos;
        if (parser.peek() === C_NEWLINE) {
            ++parser.pos;
            const hardbreak = new HardbreakNode();
            node.appendChild(hardbreak);
        } else if (reEscapable.test(subj.charAt(parser.pos))) {
            node.appendChild(parser.text(subj.charAt(parser.pos)));
            ++parser.pos;
        } else {
            node.appendChild(parser.text('\\'));
        }
        return true;
    }
}
