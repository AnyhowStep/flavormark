"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reNonSpace = /[^ \t\f\v\r\n]/;
var C_TAB = 9;
var C_SPACE = 32;
exports.CODE_INDENT = 4;
exports.isSpaceOrTab = function (c) {
    return c === C_SPACE || c === C_TAB;
};
exports.peek = function (ln, pos) {
    if (ln == null) {
        throw new Error("ln cannot be null");
    }
    if (pos < ln.length) {
        return ln.charCodeAt(pos);
    }
    else {
        return -1;
    }
};
// Returns true if block ends with a blank line, descending if needed
// into lists and sublists.
exports.endsWithBlankLine = function (blockParsers, block) {
    while (block) {
        if (block.lastLineBlank) {
            return true;
        }
        const p = blockParsers.get(block);
        if (p.endsWithBlankLineIfLastChildEndsWithBlankLine) {
            block = block.getLastChild();
        }
        else {
            break;
        }
    }
    return false;
};
// Returns true if string contains only space characters.
exports.isBlank = function (s) {
    if (s == null) {
        throw new Error("s cannot be null");
    }
    return !(reNonSpace.test(s));
};
//# sourceMappingURL=util.js.map