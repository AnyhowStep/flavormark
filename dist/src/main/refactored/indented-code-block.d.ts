import { BlockParser } from "../BlockParser";
import { Parser } from "../Parser";
import { IndentedCodeBlockNode } from "./IndentedCodeBlockNode";
export declare class IndentedCodeBlockParser extends BlockParser<IndentedCodeBlockNode> {
    tryStart(parser: Parser): boolean;
    continue(parser: Parser): boolean;
    finalize(_parser: Parser, block: IndentedCodeBlockNode): void;
    canContain(): boolean;
    acceptsLines: boolean;
    isLeaf: boolean;
    appendString(node: IndentedCodeBlockNode, str: string): void;
    getString(node: IndentedCodeBlockNode): string;
    unsetString(node: IndentedCodeBlockNode): void;
}
export declare const indentedCodeBlockParser: IndentedCodeBlockParser;
