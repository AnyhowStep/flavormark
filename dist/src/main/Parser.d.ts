import { BlockParser } from "./BlockParser";
import { BlockParserCollection } from "./BlockParserCollection";
import { Node, Range } from "./Node";
import { InlineContentParser } from "./InlineContentParser";
export interface Options {
    time?: boolean;
}
export declare class Parser {
    doc: Node;
    tip: Node | undefined;
    oldtip: Node | undefined;
    currentLine: string;
    lineNumber: number;
    offset: number;
    column: number;
    nextNonspace: number;
    nextNonspaceColumn: number;
    indent: number;
    indented: boolean;
    blank: boolean;
    partiallyConsumedTab: boolean;
    allClosed: boolean;
    lastMatchedContainer: Node;
    lastLineLength: number;
    inlineParser: InlineContentParser;
    options: Options;
    blockParsers: BlockParserCollection;
    constructor(blockParsers: BlockParserCollection, inlineParser: InlineContentParser, options?: Options | undefined);
    addLine(): void;
    getRangeStart(offset: number): {
        start: {
            row: number;
            column: number;
        };
        end: {
            row: number;
            column: number;
        };
    };
    addChild<NodeT extends Node>(blockParser: BlockParser<NodeT>, offset: number): NodeT;
    closeUnmatchedBlocks(): void;
    advanceOffset(count: number, columns?: boolean): void;
    advanceNextNonspace(): void;
    findNextNonspace(): void;
    incorporateLine(ln: string): void;
    finalize(block: Node, lineNumber: number): void;
    processInlines(block: Node): void;
    parse(input: string): Node;
    isParagraphNode(node: Node): boolean;
    getParagraphString(node: Node): string;
    setParagraphString(node: Node, str: string): void;
    createParagraph(sourcepos: Range): Node;
    getBlockParser<NodeT extends Node>(key: NodeT): BlockParser<NodeT>;
    getBlockParser(key: string): BlockParser<Node>;
    getBlockParsers(): BlockParserCollection<Node, Node>;
    endsWithBlankLine(node: Node): boolean;
}
