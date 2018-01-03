import { BlockParser } from "./BlockParser";
import { Parser } from "../blocks";
import { Node } from "../node";
import { HtmlBlockNode } from "./HtmlBlockNode";
export declare class HtmlBlockParser extends BlockParser<HtmlBlockNode> {
    tryStart: (parser: Parser, container: Node) => boolean;
    continue: (parser: Parser, container: HtmlBlockNode) => boolean;
    finalize: (_parser: Parser, block: HtmlBlockNode) => void;
    canContain: () => boolean;
    acceptsLines: boolean;
    finalizeAtLine: (parser: Parser, container: HtmlBlockNode) => boolean;
    isLeaf: boolean;
    appendString(node: HtmlBlockNode, str: string): void;
    getString(node: HtmlBlockNode): string;
    unsetString(node: HtmlBlockNode): void;
}
export declare const htmlBlockParser: HtmlBlockParser;
