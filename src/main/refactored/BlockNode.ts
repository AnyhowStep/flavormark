import {Node, NodeType} from "../node";

export class BlockNode extends Node {
    parent : BlockNode|null = null;
    firstChild : BlockNode|null = null;
    lastChild : BlockNode|null = null;
    prev : BlockNode|null = null;
    next : BlockNode|null = null;
    public sourcepos : [[number, number], [number, number]];
    public constructor (nodeType : NodeType, sourcepos : [[number, number], [number, number]]) {
        super(nodeType, sourcepos);
    }
}
