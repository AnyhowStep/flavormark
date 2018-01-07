import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { Thead } from "./../node/TableNode";
export declare class TheadParser extends BlockParser<Thead> {
    constructor(nodeType?: string, nodeCtor?: BlockNodeCtor<Thead>);
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
}
