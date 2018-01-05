import {InParser} from "./InParser";
import {InlineParser} from "../InlineParser";
import {Node} from "../node";
//import {Node} from "./Node";
import {BlockParser} from "../refactored/BlockParser";
import {CheckboxNode} from "./CheckboxNode";
import {Parser} from "../Parser";

export class CheckboxParser extends InParser {
    public parse (parser : InlineParser, block : Node, blockParser : BlockParser, mainParserThing : Parser) : boolean {
        //console.log(block.type, blockParser.isListItem, parser.pos);

        if (mainParserThing.isParagraphNode(block)) {
            if (block.parent == null) {
                return false;
            }
            block = block.parent;
            blockParser = mainParserThing.getBlockParser(block);
        }

        if (blockParser.isListItem != true) {
            return false;
        }
        if (parser.pos != 0) {
            return false;
        }
        //console.log(parser.pos, parser.subject.substr(parser.pos));

        const m = parser.match(/^\s*\[(\s|x|X)\]/);
        if (m == null) {
            return false;
        }

        const checkCharacter = m[m.length-2];
        const checked = (checkCharacter == "x" || checkCharacter == "X");

        var node = new CheckboxNode("checkbox");
        node.checked = checked;
        block.prependChild(node);
        return true;
    }
}
