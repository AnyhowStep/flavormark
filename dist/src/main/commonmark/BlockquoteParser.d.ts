import { BlockParser, BlockNodeCtor } from "../BlockParser";
import { Parser } from "../Parser";
import { BlockquoteNode } from "./BlockquoteNode";
export declare class BlockquoteParser extends BlockParser<BlockquoteNode> {
    acceptsLines: boolean;
    constructor(nodeType?: string, nodeCtor?: BlockNodeCtor<BlockquoteNode>);
    tryStart(parser: Parser): boolean;
    continue(parser: Parser): boolean;
    finalize(): void;
    canContain(): boolean;
    ignoreLastLineBlank(): boolean;
}
