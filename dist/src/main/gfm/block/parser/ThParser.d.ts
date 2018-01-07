import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { ThNode } from "./../node/ThNode";
export declare class ThParser extends BlockParser<ThNode> {
    parseInlines: boolean;
    constructor(nodeCtor?: BlockNodeCtor<ThNode>);
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
    getString(node: ThNode): string;
}
