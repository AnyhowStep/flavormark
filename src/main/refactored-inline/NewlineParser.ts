import {InParser} from "./InParser";
import {InlineParser} from "../inlines";
import {BlockNode} from "../refactored/BlockNode";
import {InlineNode} from "./InlineNode";

var C_NEWLINE = 10;
var reFinalSpace = / *$/;

var reInitialSpace = /^ */;

export class NewlineParser extends InParser {
    public parse (parser : InlineParser, block : BlockNode) : boolean {
        const c = parser.peek();
        if (c != C_NEWLINE) {
            return false;
        }
        ++parser.pos;

        // check previous node for trailing spaces
        var lastc = block.lastChild;
        if (lastc && lastc.type === "text" && lastc.literal == null) {
            throw new Error("lastc.literal cannot be null");
        }
        if (lastc && lastc.type === 'text' && lastc.literal != null && lastc.literal[lastc.literal.length - 1] === ' ') {
            var hardbreak = lastc.literal[lastc.literal.length - 2] === ' ';
            lastc.literal = lastc.literal.replace(reFinalSpace, '');
            block.appendChild(new InlineNode(hardbreak ? 'linebreak' : 'softbreak'));
        } else {
            block.appendChild(new InlineNode('softbreak'));
        }
        parser.match(reInitialSpace); // gobble leading spaces in next line
        return true;
    }
}
