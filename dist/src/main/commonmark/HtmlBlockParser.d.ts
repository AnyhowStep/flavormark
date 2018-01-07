import { BlockParser, BlockNodeCtor } from "../BlockParser";
import { Parser } from "../Parser";
import { Node } from "../Node";
import { HtmlBlockNode } from "./block/node/HtmlBlockNode";
export declare class HtmlBlockParser extends BlockParser<HtmlBlockNode> {
    acceptsLines: boolean;
    isLeaf: boolean;
    constructor(nodeType?: string, nodeCtor?: BlockNodeCtor<HtmlBlockNode>);
    tryStart(parser: Parser, node: Node): boolean;
    continue(parser: Parser, node: HtmlBlockNode): boolean;
    finalize(_parser: Parser, node: HtmlBlockNode): void;
    canContain(): boolean;
    finalizeAtLine(parser: Parser, node: HtmlBlockNode): boolean;
    appendString(node: HtmlBlockNode, str: string): void;
    getString(node: HtmlBlockNode): string;
}
