import { TextNode } from "./refactored-inline/TextNode";
import { BlockParser } from "./refactored/BlockParser";
import { InParser } from "./refactored-inline/InParser";
import { RegexStream } from "./refactored-misc/RegexStream";
import { Node } from "./node";
import { Parser } from "./Parser";
export declare class InlineParser extends RegexStream {
    private inParsers;
    constructor(inParsers: InParser[]);
    text(s: string): TextNode;
    isTextNode(node: Node): node is TextNode;
    parseInline(parser: Parser, blockParser: BlockParser, block: Node): boolean;
    parse(parser: Parser, blockParser: BlockParser, block: Node): void;
}
