import { Parser } from "../blocks";
import { Node } from "../node";
export declare type BlockNodeCtor<NodeT extends Node> = {
    new (nodeType: string, sourcepos: [[number, number], [number, number]]): NodeT;
};
export interface BlockParserMeta {
    canContain: (blockParser: BlockParserMeta) => boolean;
    acceptsLines: boolean;
    earlyExitOnEnd?: boolean;
    parseInlines?: boolean;
    acceptLazyContinuation?: boolean;
    isLeaf?: boolean;
    isParagraph?: boolean;
    isList?: boolean;
    isListItem?: boolean;
    endsWithBlankLineIfLastChildEndsWithBlankLine?: boolean;
}
export declare abstract class BlockParser<NodeT extends Node = Node> implements BlockParserMeta {
    private readonly nodeType;
    private readonly nodeCtor;
    constructor(nodeType: string, nodeCtor: BlockNodeCtor<NodeT>);
    getNodeType(): string;
    getNodeCtor(): BlockNodeCtor<NodeT>;
    reinit(): void;
    tryStart?: (parser: Parser, container: Node) => boolean;
    continue: (parser: Parser, block: NodeT) => boolean;
    lazyContinue: (parser: Parser, block: NodeT) => void;
    finalize: (parser: Parser, block: NodeT) => void;
    ignoreLastLineBlank?: ((parser: Parser, container: NodeT) => boolean);
    finalizeAtLine?: (parser: Parser, container: NodeT) => boolean;
    appendString(_node: NodeT, _str: string): void;
    getString(_node: NodeT): string;
    unsetString(_node: NodeT): void;
    setString(_node: NodeT, _str: string): void;
    canContain: (blockParser: BlockParserMeta) => boolean;
    acceptsLines: boolean;
    earlyExitOnEnd?: boolean;
    parseInlines?: boolean;
    acceptLazyContinuation?: boolean;
    isLeaf?: boolean;
    isParagraph?: boolean;
    isList?: boolean;
    isListItem?: boolean;
    endsWithBlankLineIfLastChildEndsWithBlankLine?: boolean;
    isActuallyParagraph(): boolean;
}
