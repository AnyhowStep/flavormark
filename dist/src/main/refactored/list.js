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
        var item = block.firstChild;
        while (item) {
            // check for non-final list item ending with blank line:
            if (util_1.endsWithBlankLine(parser.getBlockParsers(), item) && item.next) {
                block.listData.tight = false;
                break;
            }
            // recurse into children of list item, to see if there are
            // spaces between any of them:
            var subitem = item.firstChild;
            while (subitem) {
                if (util_1.endsWithBlankLine(parser.getBlockParsers(), subitem) &&
                    (item.next || subitem.next)) {
                    block.listData.tight = false;
                    break;
                }
                subitem = subitem.next;
            }
            item = item.next;
        }
    }
    ;
    canContain(blockParser) { return blockParser instanceof item_1.ItemParser; }
    ;
}
exports.ListParser = ListParser;
exports.listParser = new ListParser("list", ListNode_1.ListNode);
//# sourceMappingURL=list.js.map