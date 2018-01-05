import { BlockParser } from "../BlockParser";
import { Parser } from "../Parser";
import { Node } from "../Node";
import { FencedCodeBlockNode } from "./FencedCodeBlockNode";
export declare class FencedCodeBlockParser extends BlockParser<FencedCodeBlockNode> {
    tryStart: (parser: Parser) => boolean;
    continue: (parser: Parser, container: FencedCodeBlockNode) => boolean;
    finalize: (_parser: Parser, block: FencedCodeBlockNode) => void;
    canContain: () => boolean;
    acceptsLines: boolean;
    earlyExitOnEnd: boolean;
    ignoreLastLineBlank: (_parser: Parser, _container: Node) => boolean;
    isLeaf: boolean;
    appendString(node: FencedCodeBlockNode, str: string): void;
    getString(node: FencedCodeBlockNode): string;
    unsetString(node: FencedCodeBlockNode): void;
}
export declare const fencedCodeBlockParser: FencedCodeBlockParser;
