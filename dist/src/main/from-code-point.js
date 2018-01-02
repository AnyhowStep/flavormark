"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromCodePoint(...codePoints) {
    try {
        return String.fromCodePoint(...codePoints);
    }
    catch (e) {
        if (e instanceof RangeError) {
            return String.fromCharCode(0xFFFD);
        }
        throw e;
    }
}
exports.fromCodePoint = fromCodePoint;
//# sourceMappingURL=from-code-point.js.map