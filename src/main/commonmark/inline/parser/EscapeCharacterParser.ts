import {InlineParser} from "./../../../InlineParser";
import {InlineContentParser} from "./../../../InlineContentParser";
import {Node} from "./../../../Node";
import {ESCAPABLE} from "./../../../common";
import {HardbreakNode} from "./../node/HardbreakNode";

const C_NEWLINE = 10;
const C_BACKSLASH = 92;

const reEscapable = new RegExp('^' + ESCAPABLE);

export class EscapeCharacterParser extends InlineParser {
    public parse (parser : InlineContentParser, block : Node) : boolean {
        const c = parser.peek();
        if (c != C_BACKSLASH) {
            return false;
        }

        const subj = parser.subject;
        ++parser.pos;
        if (parser.peek() === C_NEWLINE) {
            ++parser.pos;
            const node = new HardbreakNode();
            block.appendChild(node);
        } else if (reEscapable.test(subj.charAt(parser.pos))) {
            block.appendChild(parser.text(subj.charAt(parser.pos)));
            ++parser.pos;
        } else {
            block.appendChild(parser.text('\\'));
        }
        return true;
    }
}
