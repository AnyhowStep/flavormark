"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reNonSpace = /[^ \t\f\v\r\n]/;
function isSpaceOrTab(c) {
    return c == " " || c == "\t";
}
exports.isSpaceOrTab = isSpaceOrTab;
;
// Returns true if block ends with a blank line, descending if needed
// into lists and sublists.
exports.endsWithBlankLine = function (blockParsers, block) {
    while (block) {
        if (block.isLastLineBlank()) {
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
    if (s == undefined) {
        throw new Error("s cannot be undefined");
    }
    return !(reNonSpace.test(s));
};
//# sourceMappingURL=util.js.map