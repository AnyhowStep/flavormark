export declare class NodeWalker {
    current: Node | null;
    root: Node;
    entering: boolean;
    constructor(root: Node);
    resumeAt(node: Node, entering: boolean): void;
    next(): {
        entering: boolean;
        node: Node;
    } | null;
}
export declare class Node {
    readonly type: string;
    readonly sourcepos?: [[number, number], [number, number]];
    lastLineBlank: boolean;
    open: boolean;
    private parent;
    private firstChild;
    private lastChild;
    private prev;
    private next;
    getParent(): Node | null;
    getFirstChild(): Node | null;
    getLastChild(): Node | null;
    getPrev(): Node | null;
    getNext(): Node | null;
    constructor(nodeType: string, sourcepos?: [[number, number], [number, number]]);
    unlink(): void;
    appendChild(child: Node): void;
    prependChild(child: Node): void;
    insertAfter(sibling: Node): void;
    insertBefore(sibling: Node): void;
    walker(): NodeWalker;
}
