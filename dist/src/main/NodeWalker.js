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
        const cur = this.current;
        const entering = this.entering;
        if (cur == undefined) {
            return undefined;
        }
        if (entering) {
            if (cur.getFirstChild()) {
                this.current = cur.getFirstChild();
                this.entering = true;
            }
            else {
                // stay on node but exit
                this.entering = false;
            }
        }
        else if (cur === this.root) {
            this.current = undefined;
        }
        else if (cur.getNext() == undefined) {
            this.current = cur.getParent();
            this.entering = false;
        }
        else {
            this.current = cur.getNext();
            this.entering = true;
        }
        return { entering: entering, node: cur };
    }
    ;
}
exports.NodeWalker = NodeWalker;
//# sourceMappingURL=NodeWalker.js.map