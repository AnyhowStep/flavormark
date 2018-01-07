import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { Tbody } from "./../node/TableNode";
export declare class TbodyParser extends BlockParser<Tbody> {
    constructor(nodeType?: string, nodeCtor?: BlockNodeCtor<Tbody>);
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
}
