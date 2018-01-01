import {Node, NodeType} from "../node";

export class BlockNode extends Node {
    public constructor (nodeType : NodeType, sourcepos : [[number, number], [number, number]]) {
        super(nodeType, sourcepos);
    }
}
