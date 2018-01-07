import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { Th } from "./../node/TableNode";
export declare class ThParser extends BlockParser<Th> {
    parseInlines: boolean;
    constructor(nodeType?: string, nodeCtor?: BlockNodeCtor<Th>);
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
    getString(node: Th): string;
}
