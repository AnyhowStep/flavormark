import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { DocumentNode } from "./../node/DocumentNode";
export declare class DocumentParser extends BlockParser<DocumentNode> {
    acceptsLines: boolean;
    constructor(nodeCtor?: BlockNodeCtor<DocumentNode>);
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
}
