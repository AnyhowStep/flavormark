import { BlockParser } from "./BlockParser";
import { Parser } from "../blocks";
import { Node } from "../node";
import { BlockNode } from "./BlockNode";
export declare class HtmlBlockParser extends BlockParser<BlockNode> {
    tryStart: (parser: Parser, container: BlockNode) => boolean;
    continue: (parser: Parser, container: Node) => boolean;
    finalize: (_parser: Parser, block: Node) => void;
    canContain: () => boolean;
    acceptsLines: boolean;
    finalizeAtLine: (parser: Parser, container: Node) => boolean;
    isLeaf: boolean;
    appendString(node: BlockNode, str: string): void;
    getString(node: BlockNode): string;
    unsetString(node: BlockNode): void;
}
export declare const htmlBlockParser: HtmlBlockParser;
