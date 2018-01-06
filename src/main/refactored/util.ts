import {Node} from "../Node";
import {BlockParserCollection} from "../BlockParserCollection";

var reNonSpace = /[^ \t\f\v\r\n]/;


var C_TAB = 9;
var C_SPACE = 32;

export var isSpaceOrTab = function(c : number) {
    return c === C_SPACE || c === C_TAB;
};

export var peek = function(ln : string|null, pos : number) {
    if (ln == null) {
        throw new Error("ln cannot be null");
    }
    if (pos < ln.length) {
        return ln.charCodeAt(pos);
    } else {
        return -1;
    }
};

// Returns true if block ends with a blank line, descending if needed
// into lists and sublists.
export var endsWithBlankLine = function(blockParsers : BlockParserCollection, block : Node|null) {
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
export var isBlank = function(s : string|null) {
    if (s == null) {
        throw new Error("s cannot be null")
    }
    return !(reNonSpace.test(s));
};
