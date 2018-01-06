import {NodeWalker} from "./NodeWalker";

export class Node {
    readonly type : string;
    readonly sourcepos? : [[number, number], [number, number]];

    public constructor (nodeType : string, sourcepos? : [[number, number], [number, number]]) {
        this.type = nodeType;
        this.sourcepos = sourcepos;
    }

    //Should only really be modified by Parser
    private lastLineBlank = false;
    private open = true;

    private parent : Node|null = null;
    private firstChild : Node|null = null;
    private lastChild : Node|null = null;
    private prev : Node|null = null;
    private next : Node|null = null;

    public isLastLineBlank () {
        return this.lastLineBlank;
    }
    public isOpen () {
        return this.open;
    }

    public setLastLineBlank (lastLineBlank : boolean) {
        this.lastLineBlank = lastLineBlank;
    }
    public close () {
        this.open = false;
    }

    public getParent () {
        return this.parent;
    }
    public getFirstChild () {
        return this.firstChild;
    }
    public getLastChild () {
        return this.lastChild;
    }
    public getPrev () {
        return this.prev;
    }
    public getNext () {
        return this.next;
    }

    public unlink () {
        if (this.prev) {
            this.prev.next = this.next;
        } else if (this.parent) {
            this.parent.firstChild = this.next;
        }
        if (this.next) {
            this.next.prev = this.prev;
        } else if (this.parent) {
            this.parent.lastChild = this.prev;
        }
        this.parent = null;
        this.next = null;
        this.prev = null;
    };
    public appendChild  (child : Node) {
        child.unlink();
        child.parent = this;
        if (this.lastChild) {
            this.lastChild.next = child;
            child.prev = this.lastChild;
            this.lastChild = child;
        } else {
            this.firstChild = child;
            this.lastChild = child;
        }
    };
    public prependChild (child : Node) {
        child.unlink();
        child.parent = this;
        if (this.firstChild) {
            this.firstChild.prev = child;
            child.next = this.firstChild;
            this.firstChild = child;
        } else {
            this.firstChild = child;
            this.lastChild = child;
        }
    };
    public insertAfter (sibling : Node) {
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
    };
    public insertBefore (sibling : Node) {
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
    };
    public walker () {
        return new NodeWalker(this);
    };
}
