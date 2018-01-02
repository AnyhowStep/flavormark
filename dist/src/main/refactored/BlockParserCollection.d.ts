import { BlockParser } from "./BlockParser";
import { BlockNode } from "./BlockNode";
export declare class BlockParserCollection<DocumentT extends BlockNode = BlockNode, ParagraphT extends BlockNode = BlockNode> {
    private documentParser;
    private paragraphParser;
    private dict;
    private arr;
    constructor(documentParser: BlockParser<DocumentT>, paragraphParser: BlockParser<ParagraphT>);
    getDocumentParser(): BlockParser<DocumentT>;
    getParagraphParser(): BlockParser<ParagraphT>;
    hasName(name: string): boolean;
    add(parser: BlockParser): this;
    get<NodeT extends BlockNode>(key: NodeT): BlockParser<NodeT>;
    get(key: string): BlockParser<BlockNode>;
    length(): number;
    at(index: number): BlockParser<BlockNode>;
    isParagraphNode(node: BlockNode): node is ParagraphT;
    instantiateDocument(sourcepos: [[number, number], [number, number]]): DocumentT;
    reinit(): void;
}
