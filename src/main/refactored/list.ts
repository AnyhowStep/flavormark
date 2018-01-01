import {BlockParser} from "./BlockParser";
import {Parser} from "../blocks";
import {Node} from "../node";
import {endsWithBlankLine} from "./util";

export const listParser : BlockParser = {
    continue: function() { return 0; },
    finalize: function(_parser : Parser, block : Node) {
        var item = block.firstChild;
        while (item) {
            // check for non-final list item ending with blank line:
            if (endsWithBlankLine(item) && item.next) {
                block.listData.tight = false;
                break;
            }
            // recurse into children of list item, to see if there are
            // spaces between any of them:
            var subitem = item.firstChild;
            while (subitem) {
                if (endsWithBlankLine(subitem) &&
                    (item.next || subitem.next)) {
                    block.listData.tight = false;
                    break;
                }
                subitem = subitem.next;
            }
            item = item.next;
        }
    },
    canContain: function(t:string) { return (t === 'item'); },
    acceptsLines: false
};
