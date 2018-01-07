import { BlockParser } from "./BlockParser";
import { Node, Range } from "./Node";
export declare class BlockParserCollection<DocumentT extends Node = Node, ParagraphT extends Node = Node> {
    private documentParser;
    private paragraphParser;
    private arr;
    constructor(documentParser: BlockParser<DocumentT>, paragraphParser: BlockParser<ParagraphT>);
    getDocumentParser(): BlockParser<DocumentT>;
    getParagraphParser(): BlockParser<ParagraphT>;
    add(parser: BlockParser): this;
    has(key: Node): boolean;
    get<NodeT extends Node>(key: NodeT): BlockParser<NodeT>;
    length(): number;
    at(index: number): BlockParser<Node>;
    isParagraphNode(node: Node): node is ParagraphT;
    instantiateDocument(sourcepos: Range): DocumentT;
    instantiateParagraph(sourcepos: Range): ParagraphT;
    reinit(): void;
}
