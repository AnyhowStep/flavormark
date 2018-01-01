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

        var container = cur.isContainer();

        if (entering && container) {
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

export type NodeType = string;/*(
    "document"|
    "block_quote"|
    "list"|
    "item"|
    "paragraph"|
    "atx_heading"|
    "setext_heading"|
    "emph"|
    "link"|
    "image"|
    "strong"|
    "custom_inline"|
    "custom_block"|
    "text"|
    "code"|
    "linebreak"|
    "softbreak"|
    "html_inline"|
    "indented_code_block"|
    "fenced_code_block"|
    "thematic_break"|
    "html_block"
);*/

export class Node {
    type : NodeType;
    parent : Node|null = null;
    firstChild : Node|null = null;
    lastChild : Node|null = null;
    prev : Node|null = null;
    next : Node|null = null;
    sourcepos? : [[number, number], [number, number]];
    lastLineBlank = false;
    open = true;
    string_content : string|null = null;
    literal : string|null = null;
    listData : {
        type? : string|null,
        tight? : boolean|null,
        bulletChar? : string|null,
        start? : number|null,
        delimiter? : string|null,
        padding? : number|null,
        markerOffset? : number|null,
    } = {};
    info : string|null = null;
    destination : string|null|undefined = null;
    title : string|null = null;
    fenceChar : string|null = null;
    fenceLength = 0;
    fenceOffset : number|null = null;
    level : number|null = null;
    onEnter = null;
    onExit = null;
    htmlBlockType : number|null = null;

    public constructor (nodeType : NodeType, sourcepos? : [[number, number], [number, number]]) {
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

    unlink () {
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
    appendChild  (child : Node) {
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
    prependChild (child : Node) {
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
    insertAfter (sibling : Node) {
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
    insertBefore (sibling : Node) {
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
    walker () {
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
