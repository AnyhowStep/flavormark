"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagFilter = /\<(\s*)(title|textarea|style|xmp|iframe|noembed|noframes|script|plaintext)(\s*)(\>)/gi;
function filterTag(raw) {
    return raw.replace(exports.tagFilter, "&lt;$1$2$3$4");
}
exports.filterTag = filterTag;
//# sourceMappingURL=tag-filter.js.map