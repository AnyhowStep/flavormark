import {BlockParser, BlockParserMeta, BlockNodeCtor} from "../BlockParser";
import {Parser} from "../Parser";
import {endsWithBlankLine} from "../refactored/util";
import {ItemNode} from "./block/node/ItemNode";
import {ListNode} from "./block/node/ListNode";
import {Node} from "../Node";

export class ListParser extends BlockParser<ListNode> {
    public acceptsLines = false;
    public endsWithBlankLineIfLastChildEndsWithBlankLine = true;

    public constructor (nodeType : string = "list", nodeCtor : BlockNodeCtor<ListNode> = ListNode) {
        super(nodeType, nodeCtor);
    }

    public continue () { return true; }
    public finalize (parser : Parser, block : ListNode) {
        let item = block.getFirstChild();
        while (item != null) {
            // check for non-final list item ending with blank line:
            if (endsWithBlankLine(parser.getBlockParsers(), item) && item.getNext()) {
                block.listData.tight = false;
                break;
            }
            // recurse into children of list item, to see if there are
            // spaces between any of them:
            let subitem = item.getFirstChild();
            while (subitem != null) {
                if (
                    endsWithBlankLine(parser.getBlockParsers(), subitem) &&
                    (
                        item.getNext() ||
                        subitem.getNext()
                    )
                ) {
                    block.listData.tight = false;
                    break;
                }
                subitem = subitem.getNext();
            }
            item = item.getNext();
        }
        if (block.listData.tight) {
            //Remove all paragraph elements
            for (let item = block.getFirstChild(); item != undefined; item = item.getNext()) {
                for (let paragraph = item.getFirstChild(); paragraph != undefined; paragraph = paragraph.getNext()) {
                    if (parser.isParagraphNode(paragraph)) {
                        //Move all its children to item, unlink paragraph
                        parser.inlineParser.parse(parser, parser.getBlockParsers().getParagraphParser(), paragraph);
                        let cur = paragraph.getFirstChild();
                        while (cur != undefined) {
                            let nxt = cur.getNext();

                            paragraph.insertBefore(cur);

                            cur = nxt;
                        }
                        paragraph.unlink();
                    }
                }
            }
        }
    }
    public canContain (_blockParser : BlockParserMeta, node : Node) {
        return node instanceof ItemNode;
    }
}
