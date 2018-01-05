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
    type: string;
    sourcepos?: [[number, number], [number, number]];
    lastLineBlank: boolean;
    open: boolean;
    parent: Node | null;
    firstChild: Node | null;
    lastChild: Node | null;
    prev: Node | null;
    next: Node | null;
    constructor(nodeType: string, sourcepos?: [[number, number], [number, number]]);
    unlink(): void;
    appendChild(child: Node): void;
    prependChild(child: Node): void;
    insertAfter(sibling: Node): void;
    insertBefore(sibling: Node): void;
    walker(): NodeWalker;
}
