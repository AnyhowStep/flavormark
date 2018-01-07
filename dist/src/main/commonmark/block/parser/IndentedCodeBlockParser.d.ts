import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { Parser } from "./../../../Parser";
import { IndentedCodeBlockNode } from "./../node/IndentedCodeBlockNode";
export declare class IndentedCodeBlockParser extends BlockParser<IndentedCodeBlockNode> {
    acceptsLines: boolean;
    isLeaf: boolean;
    constructor(nodeCtor?: BlockNodeCtor<IndentedCodeBlockNode>);
    tryStart(parser: Parser): boolean;
    continue(parser: Parser): boolean;
    finalize(_parser: Parser, node: IndentedCodeBlockNode): void;
    canContain(): boolean;
    appendString(node: IndentedCodeBlockNode, str: string): void;
    getString(node: IndentedCodeBlockNode): string;
}
