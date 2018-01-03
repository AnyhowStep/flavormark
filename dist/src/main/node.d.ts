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
export declare type NodeType = string;
export declare class Node {
    type: NodeType;
    parent: Node | null;
    firstChild: Node | null;
    lastChild: Node | null;
    prev: Node | null;
    next: Node | null;
    sourcepos?: [[number, number], [number, number]];
    lastLineBlank: boolean;
    open: boolean;
    literal: string | null;
    info: string | null;
    destination: string | null | undefined;
    title: string | null;
    onEnter: null;
    onExit: null;
    constructor(nodeType: NodeType, sourcepos?: [[number, number], [number, number]]);
    isContainer(): boolean;
    unlink(): void;
    appendChild(child: Node): void;
    prependChild(child: Node): void;
    insertAfter(sibling: Node): void;
    insertBefore(sibling: Node): void;
    walker(): NodeWalker;
}
