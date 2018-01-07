import { Parser } from "./Parser";
import { Node, Range } from "./Node";
export declare type BlockNodeCtor<NodeT extends Node> = {
    new (sourcepos: Range): NodeT;
};
export interface BlockParserMeta {
    canContain(blockParser: BlockParserMeta, node: Node): boolean;
    canBeContainedBy(blockParser: BlockParserMeta, node: Node): boolean;
    acceptsLines: boolean;
    isParagraph?: boolean;
    acceptLazyContinuation?: boolean;
    earlyExitOnEnd?: boolean;
    parseInlines?: boolean;
    isLeaf?: boolean;
    endsWithBlankLineIfLastChildEndsWithBlankLine?: boolean;
}
export declare abstract class BlockParser<NodeT extends Node = Node> implements BlockParserMeta {
    abstract canContain(blockParser: BlockParserMeta, node: Node): boolean;
    canBeContainedBy(_blockParser: BlockParserMeta, _node: Node): boolean;
    acceptsLines: boolean;
    isParagraph?: boolean;
    acceptLazyContinuation?: boolean;
    earlyExitOnEnd?: boolean;
    parseInlines?: boolean;
    isLeaf?: boolean;
    endsWithBlankLineIfLastChildEndsWithBlankLine?: boolean;
    private readonly nodeCtor;
    constructor(nodeCtor: BlockNodeCtor<NodeT>);
    isParserOf<OtherT extends Node>(node: OtherT): this is BlockParser<OtherT>;
    getNodeCtor(): BlockNodeCtor<NodeT>;
    getName(): string;
    instantiate(sourceRange: Range): NodeT;
    appendString(_node: NodeT, _str: string): void;
    getString(_node: NodeT): string;
    setString(_node: NodeT, _str: string): void;
    isActuallyParagraph(): boolean;
    reinit(): void;
    tryStart(_parser: Parser, _container: Node): boolean;
    abstract continue(_parser: Parser, _block: NodeT): boolean;
    lazyContinue(_parser: Parser, _block: NodeT): void;
    finalizeAtLine(_parser: Parser, _container: NodeT): boolean;
    abstract finalize(parser: Parser, block: NodeT): void;
    ignoreLastLineBlank(_parser: Parser, _container: NodeT): boolean;
}
