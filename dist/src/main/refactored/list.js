"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_1 = require("./item");
const BlockParser_1 = require("../BlockParser");
const util_1 = require("./util");
//
const ListNode_1 = require("./ListNode");
class ListParser extends BlockParser_1.BlockParser {
    constructor() {
        super(...arguments);
        this.acceptsLines = false;
        this.endsWithBlankLineIfLastChildEndsWithBlankLine = true;
    }
    continue() { return true; }
    finalize(parser, block) {
        var item = block.getFirstChild();
        while (item) {
            // check for non-final list item ending with blank line:
            if (util_1.endsWithBlankLine(parser.getBlockParsers(), item) && item.getNext()) {
                block.listData.tight = false;
                break;
            }
            // recurse into children of list item, to see if there are
            // spaces between any of them:
            var subitem = item.getFirstChild();
            while (subitem) {
                if (util_1.endsWithBlankLine(parser.getBlockParsers(), subitem) &&
                    (item.getNext() || subitem.getNext())) {
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
    ;
    canContain(blockParser) { return blockParser instanceof item_1.ItemParser; }
    ;
}
exports.ListParser = ListParser;
exports.listParser = new ListParser("list", ListNode_1.ListNode);
//# sourceMappingURL=list.js.map