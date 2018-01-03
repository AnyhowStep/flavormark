import { InlineNode } from "./refactored-inline/InlineNode";
import { TextNode } from "./refactored-inline/TextNode";
import { BlockParser } from "./refactored/BlockParser";
import { InParser } from "./refactored-inline/InParser";
import { RegexStream } from "./refactored-misc/RegexStream";
import { Node } from "./node";
export declare class InlineParser extends RegexStream {
    private inParsers;
    constructor(inParsers: InParser[]);
    text(s: string): InlineNode;
    isTextNode(node: InlineNode): node is TextNode;
    parseInline(block: Node): boolean;
    parse(blockParser: BlockParser, block: Node): void;
}
