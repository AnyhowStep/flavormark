"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DelimiterCollection {
    constructor() {
        this.top = undefined; // used by handleDelim method
    }
    clear() {
        this.top = undefined;
    }
    remove(delim) {
        if (!delim) {
            return;
        }
        if (delim.previous != undefined) {
            delim.previous.next = delim.next;
        }
        if (delim.next == undefined) {
            // top of stack
            this.top = delim.previous;
        }
        else {
            delim.next.previous = delim.previous;
        }
    }
    ;
    peek() {
        return this.top;
    }
    push(args) {
        this.top = Object.assign({}, args, { previous: this.top, next: undefined });
        if (this.top.previous != undefined) {
            this.top.previous.next = this.top;
        }
        return this.top;
    }
}
exports.DelimiterCollection = DelimiterCollection;
function removeDelimitersBetween(bottom, top) {
    if (bottom && bottom.next !== top) {
        bottom.next = top;
        top.previous = bottom;
    }
}
exports.removeDelimitersBetween = removeDelimitersBetween;
;
//# sourceMappingURL=DelimiterCollection.js.map