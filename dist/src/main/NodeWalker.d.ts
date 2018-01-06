import { Node } from "./Node";
export declare class NodeWalker {
    private current;
    private root;
    private entering;
    constructor(root: Node);
    resumeAt(node: Node, entering: boolean): void;
    next(): {
        entering: boolean;
        node: Node;
    } | undefined;
}
