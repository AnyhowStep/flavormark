"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BracketCollection {
    constructor(delimiters) {
        this.top = undefined;
        this.delimiters = delimiters;
    }
    clear() {
        this.top = undefined;
    }
    push(node, index, image) {
        if (this.top != undefined) {
            this.top.bracketAfter = true;
        }
        this.top = {
            node: node,
            previous: this.top,
            previousDelimiter: this.delimiters.peek(),
            index: index,
            image: image,
            active: true
        };
    }
    pop() {
        if (this.top == undefined) {
            throw new Error("Removed more than we added");
        }
        this.top = this.top.previous;
    }
    peek() {
        return this.top;
    }
}
exports.BracketCollection = BracketCollection;
//# sourceMappingURL=BracketCollection.js.map