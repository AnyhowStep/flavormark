import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { TdNode } from "./../node/TdNode";
export declare class TdParser extends BlockParser<TdNode> {
    parseInlines: boolean;
    constructor(nodeType?: string, nodeCtor?: BlockNodeCtor<TdNode>);
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
    getString(node: TdNode): string;
}
