import {Node} from "../Node";
import {BlockParserCollection} from "../BlockParserCollection";

var reNonSpace = /[^ \t\f\v\r\n]/;

export function isSpaceOrTab (c : string) {
    return c == " " || c == "\t";
};

// Returns true if block ends with a blank line, descending if needed
// into lists and sublists.
export var endsWithBlankLine = function(blockParsers : BlockParserCollection, block : Node|undefined) {
    while (block) {
        if (block.isLastLineBlank()) {
            return true;
        }
        const p = blockParsers.get(block);
        if (p.endsWithBlankLineIfLastChildEndsWithBlankLine) {
            block = block.getLastChild();
        } else {
            break;
        }
    }
    return false;
};

// Returns true if string contains only space characters.
export var isBlank = function(s : string|undefined) {
    if (s == undefined) {
        throw new Error("s cannot be undefined")
    }
    return !(reNonSpace.test(s));
};
