import { NodeWalker } from "./NodeWalker";
export interface Position {
    row: number;
    column: number;
}
export interface Range {
    start: Position;
    end: Position;
}
export declare class Node {
    readonly sourceRange?: Range;
    constructor(sourceRange?: Range);
    private lastLineBlank;
    private open;
    private parent;
    private firstChild;
    private lastChild;
    private prev;
    private next;
    getSourceRangeOrError(): {
        start: Position;
        end: Position;
    };
    isLastLineBlank(): boolean;
    isOpen(): boolean;
    setLastLineBlank(lastLineBlank: boolean): void;
    close(): void;
    getParent(): Node | undefined;
    getFirstChild(): Node | undefined;
    getLastChild(): Node | undefined;
    getPrev(): Node | undefined;
    getNext(): Node | undefined;
    unlink(): void;
    appendChild(child: Node): void;
    prependChild(child: Node): void;
    insertAfter(sibling: Node): void;
    insertBefore(sibling: Node): void;
    walker(): NodeWalker;
}
