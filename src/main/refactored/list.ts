import {BlockParser} from "./BlockParser";
import {Parser} from "../blocks";
import {Node} from "../node";
import {endsWithBlankLine} from "./util";
import {BlockNode} from "./BlockNode";

export class ListParser extends BlockParser {
    continue= () =>{ return true; };
    finalize= (parser : Parser, block : Node) =>{
        var item = block.firstChild;
        while (item) {
            // check for non-final list item ending with blank line:
            if (endsWithBlankLine(parser.getBlockParsers(), item) && item.next) {
                block.listData.tight = false;
                break;
            }
            // recurse into children of list item, to see if there are
            // spaces between any of them:
            var subitem = item.firstChild;
            while (subitem) {
                if (endsWithBlankLine(parser.getBlockParsers(), subitem) &&
                    (item.next || subitem.next)) {
                    block.listData.tight = false;
                    break;
                }
                subitem = subitem.next;
            }
            item = item.next;
        }
    };

    canContain= (blockParser : BlockParser) =>{ return blockParser.isListItem == true; };
    acceptsLines= false;
    isList = true;
}

export const listParser = new ListParser("list", BlockNode);
