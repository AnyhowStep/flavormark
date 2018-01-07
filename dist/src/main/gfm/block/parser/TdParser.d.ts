import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { Td } from "./../node/TableNode";
export declare class TdParser extends BlockParser<Td> {
    parseInlines: boolean;
    constructor(nodeType?: string, nodeCtor?: BlockNodeCtor<Td>);
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
    getString(node: Td): string;
}
