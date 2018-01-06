import { BlockParser, BlockNodeCtor } from "../BlockParser";
import { DocumentNode } from "./DocumentNode";
export declare class DocumentParser extends BlockParser<DocumentNode> {
    acceptsLines: boolean;
    constructor(nodeType?: string, nodeCtor?: BlockNodeCtor<DocumentNode>);
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
}
