import {ItemParser} from "./item";
import {BlockParser, BlockParserMeta} from "../BlockParser";
import {Parser} from "../Parser";
import {endsWithBlankLine} from "./util";
//
import {ListNode} from "./ListNode";

export class ListParser extends BlockParser<ListNode> {
    continue () { return true; }
    finalize (parser : Parser, block : ListNode) {
        var item = block.getFirstChild();
        while (item) {
            // check for non-final list item ending with blank line:
            if (endsWithBlankLine(parser.getBlockParsers(), item) && item.getNext()) {
                block.listData.tight = false;
                break;
            }
            // recurse into children of list item, to see if there are
            // spaces between any of them:
            var subitem = item.getFirstChild();
            while (subitem) {
                if (endsWithBlankLine(parser.getBlockParsers(), subitem) &&
                    (item.getNext() || subitem.getNext())) {
                    block.listData.tight = false;
                    break;
                }
                subitem = subitem.getNext();
            }
            item = item.getNext();
        }
    };

    canContain (blockParser : BlockParserMeta) { return blockParser instanceof ItemParser; };
    acceptsLines= false;
    endsWithBlankLineIfLastChildEndsWithBlankLine = true;
}

export const listParser = new ListParser("list", ListNode);
