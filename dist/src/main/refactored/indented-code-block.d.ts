import { BlockParser } from "./BlockParser";
import { Parser } from "../blocks";
import { Node } from "../node";
import { BlockNode } from "./BlockNode";
export declare class IndentedCodeBlockParser extends BlockParser<BlockNode> {
    tryStart: (parser: Parser) => boolean;
    continue: (parser: Parser) => boolean;
    finalize: (_parser: Parser, block: Node) => void;
    canContain: () => boolean;
    acceptsLines: boolean;
    isLeaf: boolean;
    appendString(node: BlockNode, str: string): void;
    getString(node: BlockNode): string;
    unsetString(node: BlockNode): void;
}
export declare const indentedCodeBlockParser: IndentedCodeBlockParser;
