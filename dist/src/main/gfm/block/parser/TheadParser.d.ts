import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { TheadNode } from "./../node/TheadNode";
export declare class TheadParser extends BlockParser<TheadNode> {
    constructor(nodeCtor?: BlockNodeCtor<TheadNode>);
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
}
