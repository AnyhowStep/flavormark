"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NodeWalker {
    constructor(root) {
        this.current = root;
        this.root = root;
        this.entering = true;
    }
    resumeAt(node, entering) {
        this.current = node;
        this.entering = (entering === true);
    }
    ;
    next() {
        var cur = this.current;
        var entering = this.entering;
        if (cur === null) {
            return null;
        }
        var container = cur.isContainer();
        if (entering && container) {
            if (cur.firstChild) {
                this.current = cur.firstChild;
                this.entering = true;
            }
            else {
                // stay on node but exit
                this.entering = false;
            }
        }
        else if (cur === this.root) {
            this.current = null;
        }
        else if (cur.next === null) {
            this.current = cur.parent;
            this.entering = false;
        }
        else {
            this.current = cur.next;
            this.entering = true;
        }
        return { entering: entering, node: cur };
    }
    ;
}
exports.NodeWalker = NodeWalker;
class Node {
    //onEnter = null;
    //onExit = null;
    constructor(nodeType, sourcepos) {
        this.parent = null;
        this.firstChild = null;
        this.lastChild = null;
        this.prev = null;
        this.next = null;
        this.lastLineBlank = false;
        this.open = true;
        this.destination = null;
        this.title = null;
        this.type = nodeType;
        this.sourcepos = sourcepos;
    }
    isContainer() {
        switch (this.type) {
            case 'document':
            case 'block_quote':
            case 'list':
            case 'item':
            case 'paragraph':
            case 'atx_heading':
            case 'setext_heading':
            case 'emph':
            case 'strong':
            case 'link':
            case 'image':
            case 'custom_inline':
            case 'custom_block':
                return true;
            default:
                return false;
        }
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
        this.parent = null;
        this.next = null;
        this.prev = null;
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
        var walker = new NodeWalker(this);
        return walker;
    }
    ;
}
exports.Node = Node;
/* Example of use of walker:

 var walker = w.walker();
 var event;

 while (event = walker.next()) {
 console.log(event.entering, event.node.type);
 }

 */
//# sourceMappingURL=node.js.map