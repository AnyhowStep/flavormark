import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { TrNode } from "./../node/TrNode";
export declare class TrParser extends BlockParser<TrNode> {
    constructor(nodeCtor?: BlockNodeCtor<TrNode>);
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
}
