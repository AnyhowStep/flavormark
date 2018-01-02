import { Node, NodeType } from "../node";
export declare class BlockNode extends Node {
    parent: BlockNode | null;
    firstChild: BlockNode | null;
    lastChild: BlockNode | null;
    prev: BlockNode | null;
    next: BlockNode | null;
    sourcepos: [[number, number], [number, number]];
    constructor(nodeType: NodeType, sourcepos: [[number, number], [number, number]]);
}
