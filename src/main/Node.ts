export class NodeWalker {
    current: Node|null;
    root : Node;
    entering : boolean;
    public constructor (root : Node) {
        this.current = root;
        this.root = root;
        this.entering = true;
    }
    resumeAt (node : Node, entering : boolean) {
        this.current = node;
        this.entering = (entering === true);
    };
    next () {
        var cur = this.current;
        var entering = this.entering;

        if (cur === null) {
            return null;
        }

        if (entering) {
            if (cur.firstChild) {
                this.current = cur.firstChild;
                this.entering = true;
            } else {
                // stay on node but exit
                this.entering = false;
            }

        } else if (cur === this.root) {
            this.current = null;

        } else if (cur.next === null) {
            this.current = cur.parent;
            this.entering = false;

        } else {
            this.current = cur.next;
            this.entering = true;
        }

        return {entering: entering, node: cur};
    };
}

export class Node {
    type : string;
    parent : Node|null = null;
    firstChild : Node|null = null;
    lastChild : Node|null = null;
    prev : Node|null = null;
    next : Node|null = null;
    sourcepos? : [[number, number], [number, number]];
    lastLineBlank = false;
    open = true;

    public constructor (nodeType : string, sourcepos? : [[number, number], [number, number]]) {
        this.type = nodeType;
        this.sourcepos = sourcepos;
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
        var walker = new NodeWalker(this);
        return walker;
    };
}

/* Example of use of walker:

 var walker = w.walker();
 var event;

 while (event = walker.next()) {
 console.log(event.entering, event.node.type);
 }

 */
