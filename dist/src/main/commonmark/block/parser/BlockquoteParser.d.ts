import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { Parser } from "./../../../Parser";
import { BlockquoteNode } from "./../node/BlockquoteNode";
export declare class BlockquoteParser extends BlockParser<BlockquoteNode> {
    static readonly START_CHAR: string;
    acceptsLines: boolean;
    constructor(nodeCtor?: BlockNodeCtor<BlockquoteNode>);
    tryStart(parser: Parser): boolean;
    continue(parser: Parser): boolean;
    finalize(): void;
    canContain(): boolean;
    ignoreLastLineBlank(): boolean;
}
