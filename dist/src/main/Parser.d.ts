import { BlockParser } from "./refactored/BlockParser";
import { BlockParserCollection } from "./refactored/BlockParserCollection";
import { Node } from "./Node";
import { InlineParser } from "./InlineParser";
export interface Options {
    time?: boolean;
}
export declare class Parser {
    doc: Node;
    tip: Node | null;
    oldtip: Node | null;
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
    inlineParser: InlineParser;
    options: Options;
    blockParsers: BlockParserCollection;
    constructor(blockParsers: BlockParserCollection, inlineParser: InlineParser, options?: Options | undefined);
    addLine(): void;
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
    createParagraph(sourcepos: [[number, number], [number, number]]): Node;
    getBlockParser<NodeT extends Node>(key: NodeT): BlockParser<NodeT>;
    getBlockParser(key: string): BlockParser<Node>;
    getBlockParsers(): BlockParserCollection<Node, Node>;
}
