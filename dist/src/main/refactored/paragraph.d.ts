import { BlockParser, BlockNodeCtor } from "./BlockParser";
import { Parser } from "../blocks";
import { RefMap } from "../refactored-misc/RefMap";
import { ParagraphNode } from "./ParagraphNode";
export declare class ParagraphParser extends BlockParser<ParagraphNode> {
    private refMap;
    constructor(nodeType: string, nodeCtor: BlockNodeCtor<ParagraphNode>, refMap: RefMap);
    reinit(): void;
    continue: (parser: Parser) => boolean;
    finalize: (_parser: Parser, block: ParagraphNode) => void;
    canContain: () => boolean;
    acceptsLines: boolean;
    parseInlines: boolean;
    acceptLazyContinuation: boolean;
    isLeaf: boolean;
    isParagraph: boolean;
    appendString(node: ParagraphNode, str: string): void;
    getString(node: ParagraphNode): string;
    unsetString(node: ParagraphNode): void;
}
