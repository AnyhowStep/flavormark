import { TextNode } from "./refactored-inline/TextNode";
import { BlockParser } from "./BlockParser";
import { InlineParser } from "./InlineParser";
import { RegexStream } from "./refactored-misc/RegexStream";
import { Node } from "./Node";
import { Parser } from "./Parser";
export declare class InlineContentParser extends RegexStream {
    private inParsers;
    constructor(inParsers: InlineParser[]);
    text(s: string): TextNode;
    isTextNode(node: Node): node is TextNode;
    parseInline(parser: Parser, blockParser: BlockParser, block: Node): boolean;
    parse(parser: Parser, blockParser: BlockParser, block: Node): void;
}
