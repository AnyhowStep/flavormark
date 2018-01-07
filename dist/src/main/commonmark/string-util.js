"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isSpaceOrTab(c) {
    return c == " " || c == "\t";
}
exports.isSpaceOrTab = isSpaceOrTab;
//Returns true if string is empty or contains only space characters.
function isBlank(s) {
    return /^[ \t\f\v\r\n]*$/.test(s);
}
exports.isBlank = isBlank;
//# sourceMappingURL=string-util.js.map