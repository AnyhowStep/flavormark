import { BlockParser, BlockNodeCtor } from "../BlockParser";
import { Parser } from "../Parser";
import { FencedCodeBlockNode } from "./block/node/FencedCodeBlockNode";
export declare class FencedCodeBlockParser extends BlockParser<FencedCodeBlockNode> {
    acceptsLines: boolean;
    earlyExitOnEnd: boolean;
    isLeaf: boolean;
    constructor(nodeType?: string, nodeCtor?: BlockNodeCtor<FencedCodeBlockNode>);
    tryStart(parser: Parser): boolean;
    continue(parser: Parser, node: FencedCodeBlockNode): boolean;
    finalize(_parser: Parser, node: FencedCodeBlockNode): void;
    canContain(): boolean;
    ignoreLastLineBlank(): boolean;
    appendString(node: FencedCodeBlockNode, str: string): void;
    getString(node: FencedCodeBlockNode): string;
}
