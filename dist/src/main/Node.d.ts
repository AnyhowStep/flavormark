import { NodeWalker } from "./NodeWalker";
export declare class Node {
    readonly type: string;
    readonly sourcepos?: [[number, number], [number, number]];
    constructor(nodeType: string, sourcepos?: [[number, number], [number, number]]);
    private lastLineBlank;
    private open;
    private parent;
    private firstChild;
    private lastChild;
    private prev;
    private next;
    isLastLineBlank(): boolean;
    isOpen(): boolean;
    setLastLineBlank(lastLineBlank: boolean): void;
    close(): void;
    getParent(): Node | null;
    getFirstChild(): Node | null;
    getLastChild(): Node | null;
    getPrev(): Node | null;
    getNext(): Node | null;
    unlink(): void;
    appendChild(child: Node): void;
    prependChild(child: Node): void;
    insertAfter(sibling: Node): void;
    insertBefore(sibling: Node): void;
    walker(): NodeWalker;
}
