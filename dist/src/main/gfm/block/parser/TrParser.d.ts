import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { Tr } from "./../node/TableNode";
export declare class TrParser extends BlockParser<Tr> {
    constructor(nodeType?: string, nodeCtor?: BlockNodeCtor<Tr>);
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
}
