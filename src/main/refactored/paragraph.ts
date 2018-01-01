import {BlockParser} from "./BlockParser";
import {Parser} from "../blocks";
import {Node} from "../node";
import {peek, isBlank} from "./util";

var C_OPEN_BRACKET = 91;

export const paragraphParser : BlockParser = {
    continue: function(parser : Parser) {
        return (parser.blank ? false : true);
    },
    finalize: function(parser : Parser, block : Node) {
        var pos;
        var hasReferenceDefs = false;

        // try parsing the beginning as link reference definitions:
        while (peek(block.string_content, 0) === C_OPEN_BRACKET &&
               (pos =
                parser.inlineParser.parseReference(block.string_content,
                                                   parser.refmap))) {
           if (block.string_content== null) {
               throw new Error("block.string_content cannot be null");
           }
            block.string_content = block.string_content.slice(pos);
            hasReferenceDefs = true;
        }
        if (hasReferenceDefs && isBlank(block.string_content)) {
            block.unlink();
        }
    },
    canContain: function() { return false; },
    acceptsLines: true,
    parseInlines : true,
    acceptLazyContinuation : true,
    isLeaf : true,
};
