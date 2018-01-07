"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const ItemNode_1 = require("./../node/ItemNode");
const ListNode_1 = require("./../node/ListNode");
class ListParser extends BlockParser_1.BlockParser {
    constructor(nodeCtor = ListNode_1.ListNode) {
        super(nodeCtor);
        this.acceptsLines = false;
        this.endsWithBlankLineIfLastChildEndsWithBlankLine = true;
    }
    continue() { return true; }
    finalize(parser, block) {
        let item = block.getFirstChild();
        while (item != null) {
            // check for non-final list item ending with blank line:
            if (parser.endsWithBlankLine(item) && item.getNext()) {
                block.listData.tight = false;
                break;
            }
            // recurse into children of list item, to see if there are
            // spaces between any of them:
            let subitem = item.getFirstChild();
            while (subitem != null) {
                if (parser.endsWithBlankLine(subitem) &&
                    (item.getNext() ||
                        subitem.getNext())) {
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
    canContain(_blockParser, node) {
        return node instanceof ItemNode_1.ItemNode;
    }
}
exports.ListParser = ListParser;
//# sourceMappingURL=ListParser.js.map