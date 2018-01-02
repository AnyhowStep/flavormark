import { BlockParser } from "./BlockParser";
import { Parser } from "../blocks";
import { Node } from "../node";
import { BlockNode } from "./BlockNode";
export declare class FencedCodeBlockParser extends BlockParser<BlockNode> {
    tryStart: (parser: Parser) => boolean;
    continue: (parser: Parser, container: BlockNode) => boolean;
    finalize: (_parser: Parser, block: BlockNode) => void;
    canContain: () => boolean;
    acceptsLines: boolean;
    earlyExitOnEnd: boolean;
    ignoreLastLineBlank: (_parser: Parser, _container: Node) => boolean;
    isLeaf: boolean;
    appendString(node: BlockNode, str: string): void;
    getString(node: BlockNode): string;
    unsetString(node: BlockNode): void;
}
export declare const fencedCodeBlockParser: FencedCodeBlockParser;
