import { BlockParser } from "./BlockParser";
import { Node, Range } from "./Node";
export declare class BlockParserCollection<DocumentT extends Node = Node, ParagraphT extends Node = Node> {
    private documentParser;
    private paragraphParser;
    private dict;
    private arr;
    constructor(documentParser: BlockParser<DocumentT>, paragraphParser: BlockParser<ParagraphT>);
    getDocumentParser(): BlockParser<DocumentT>;
    getParagraphParser(): BlockParser<ParagraphT>;
    hasName(name: string): boolean;
    add(parser: BlockParser): this;
    has(key: string | Node): boolean;
    get<NodeT extends Node>(key: NodeT): BlockParser<NodeT>;
    get(key: string): BlockParser<Node>;
    length(): number;
    at(index: number): BlockParser<Node>;
    isParagraphNode(node: Node): node is ParagraphT;
    instantiateDocument(sourcepos: Range): DocumentT;
    reinit(): void;
}
