import {InlineParser} from "./../../../InlineParser";
import {InlineContentParser} from "./../../../InlineContentParser";
import {Node} from "./../../../Node";
import {BlockParser} from "./../../../BlockParser";
import {CheckboxNode} from "./../node/CheckboxNode";
import {Parser} from "./../../../Parser";
import {ItemParser} from "./../../../commonmark/block/parser/ItemParser";

export class CheckboxParser extends InlineParser {
    public parse (inlineContentParser : InlineContentParser, node : Node, blockParser : BlockParser, parser : Parser) : boolean {
        if (parser.isParagraphNode(node)) {
            const parent = node.getParent();
            if (parent == undefined) {
                return false;
            }
            node = parent;
            blockParser = parser.getBlockParser(node);
        }

        if (!(blockParser instanceof ItemParser)) {
            return false;
        }
        if (inlineContentParser.pos != 0) {
            return false;
        }
        //console.log(parser.pos, parser.subject.substr(parser.pos));

        const m = inlineContentParser.match(/^\s*\[(\s|x|X)\]/);
        if (m == undefined) {
            return false;
        }

        const checkCharacter = m[m.length-2];
        const checked = (checkCharacter == "x" || checkCharacter == "X");

        var checkbox = new CheckboxNode();
        checkbox.checked = checked;
        node.prependChild(checkbox);
        return true;
    }
}
