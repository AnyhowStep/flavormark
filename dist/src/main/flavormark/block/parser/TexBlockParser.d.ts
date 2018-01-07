import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { Parser } from "./../../../Parser";
import { TexBlockNode } from "./../node/TexBlockNode";
export declare class TexBlockParser extends BlockParser<TexBlockNode> {
    acceptsLines: boolean;
    earlyExitOnEnd: boolean;
    isLeaf: boolean;
    constructor(nodeCtor?: BlockNodeCtor<TexBlockNode>);
    tryStart(parser: Parser): boolean;
    continue(parser: Parser, node: TexBlockNode): boolean;
    finalize(_parser: Parser, node: TexBlockNode): void;
    canContain(): boolean;
    ignoreLastLineBlank(): boolean;
    appendString(node: TexBlockNode, str: string): void;
    getString(node: TexBlockNode): string;
}
