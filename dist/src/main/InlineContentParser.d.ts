import { TextNode } from "./TextNode";
import { BlockParser } from "./BlockParser";
import { InlineParser } from "./InlineParser";
import { RegexStream } from "./RegexStream";
import { Node } from "./Node";
import { Parser } from "./Parser";
export interface InlineContentParserArgs {
    inlineParsers: InlineParser[];
    textNodeCtor?: {
        new (str: string): TextNode;
    };
}
export declare class InlineContentParser extends RegexStream {
    private inlineParsers;
    private textNodeCtor;
    constructor(args: InlineContentParserArgs);
    text(s: string): TextNode;
    isTextNode(node: Node): node is TextNode;
    parseInline(parser: Parser, blockParser: BlockParser, node: Node): boolean;
    parse(parser: Parser, blockParser: BlockParser, node: Node): void;
}
