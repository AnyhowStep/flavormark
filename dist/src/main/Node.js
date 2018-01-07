"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeWalker_1 = require("./NodeWalker");
class Node {
    constructor(type, sourceRange) {
        //Should only really be modified by Parser
        this.lastLineBlank = false;
        this.open = true;
        this.parent = undefined;
        this.firstChild = undefined;
        this.lastChild = undefined;
        this.prev = undefined;
        this.next = undefined;
        this.type = type;
        this.sourceRange = sourceRange;
    }
    getSourceRangeOrError() {
        if (this.sourceRange == undefined) {
            throw new Error(`sourceRange is undefined`);
        }
        return Object.assign({}, this.sourceRange);
    }
    isLastLineBlank() {
        return this.lastLineBlank;
    }
    isOpen() {
        return this.open;
    }
    setLastLineBlank(lastLineBlank) {
        this.lastLineBlank = lastLineBlank;
    }
    close() {
        this.open = false;
    }
    getParent() {
        return this.parent;
    }
    getFirstChild() {
        return this.firstChild;
    }
    getLastChild() {
        return this.lastChild;
    }
    getPrev() {
        return this.prev;
    }
    getNext() {
        return this.next;
    }
    unlink() {
        if (this.prev) {
            this.prev.next = this.next;
        }
        else if (this.parent) {
            this.parent.firstChild = this.next;
        }
        if (this.next) {
            this.next.prev = this.prev;
        }
        else if (this.parent) {
            this.parent.lastChild = this.prev;
        }
        this.parent = undefined;
        this.next = undefined;
        this.prev = undefined;
    }
    ;
    appendChild(child) {
        child.unlink();
        child.parent = this;
        if (this.lastChild) {
            this.lastChild.next = child;
            child.prev = this.lastChild;
            this.lastChild = child;
        }
        else {
            this.firstChild = child;
            this.lastChild = child;
        }
    }
    ;
    prependChild(child) {
        child.unlink();
        child.parent = this;
        if (this.firstChild) {
            this.firstChild.prev = child;
            child.next = this.firstChild;
            this.firstChild = child;
        }
        else {
            this.firstChild = child;
            this.lastChild = child;
        }
    }
    ;
    insertAfter(sibling) {
        sibling.unlink();
        sibling.next = this.next;
        if (sibling.next) {
            sibling.next.prev = sibling;
        }
        sibling.prev = this;
        this.next = sibling;
        sibling.parent = this.parent;
        if (!sibling.next && sibling.parent) {
            sibling.parent.lastChild = sibling;
        }
    }
    ;
    insertBefore(sibling) {
        sibling.unlink();
        sibling.prev = this.prev;
        if (sibling.prev) {
            sibling.prev.next = sibling;
        }
        sibling.next = this;
        this.prev = sibling;
        sibling.parent = this.parent;
        if (!sibling.prev && sibling.parent) {
            sibling.parent.firstChild = sibling;
        }
    }
    ;
    walker() {
        return new NodeWalker_1.NodeWalker(this);
    }
    ;
}
exports.Node = Node;
//# sourceMappingURL=Node.js.map