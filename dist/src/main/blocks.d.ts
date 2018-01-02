import { BlockNode } from "./refactored/BlockNode";
import { BlockParser } from "./refactored/BlockParser";
import { BlockParserCollection } from "./refactored/BlockParserCollection";
import { InlineParser } from "./inlines";
export interface Options {
    time?: boolean;
}
export declare class Parser {
    doc: BlockNode;
    tip: BlockNode | null;
    oldtip: BlockNode | null;
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
    lastMatchedContainer: BlockNode;
    lastLineLength: number;
    inlineParser: InlineParser;
    options: Options;
    blockParsers: BlockParserCollection;
    constructor(blockParsers: BlockParserCollection, inlineParser: InlineParser, options?: Options | undefined);
    addLine(): void;
    addChild<NodeT extends BlockNode>(blockParser: BlockParser<NodeT>, offset: number): NodeT;
    closeUnmatchedBlocks(): void;
    advanceOffset(count: number, columns?: boolean): void;
    advanceNextNonspace(): void;
    findNextNonspace(): void;
    incorporateLine(ln: string): void;
    finalize(block: BlockNode, lineNumber: number): void;
    processInlines(block: BlockNode): void;
    parse(input: string): BlockNode;
    isParagraphNode(node: BlockNode): boolean;
    getBlockParser<NodeT extends BlockNode>(key: NodeT): BlockParser<NodeT>;
    getBlockParser(key: string): BlockParser<BlockNode>;
    getBlockParsers(): BlockParserCollection<BlockNode, BlockNode>;
}
