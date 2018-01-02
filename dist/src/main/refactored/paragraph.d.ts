import { BlockParser, BlockNodeCtor } from "./BlockParser";
import { Parser } from "../blocks";
import { Node } from "../node";
import { BlockNode } from "./BlockNode";
import { RefMap } from "../refactored-misc/RefMap";
export declare class ParagraphParser extends BlockParser<BlockNode> {
    private refMap;
    constructor(nodeType: string, nodeCtor: BlockNodeCtor<BlockNode>, refMap: RefMap);
    reinit(): void;
    continue: (parser: Parser) => boolean;
    finalize: (_parser: Parser, block: Node) => void;
    canContain: () => boolean;
    acceptsLines: boolean;
    parseInlines: boolean;
    acceptLazyContinuation: boolean;
    isLeaf: boolean;
    isParagraph: boolean;
    appendString(node: BlockNode, str: string): void;
    getString(node: BlockNode): string;
    unsetString(node: BlockNode): void;
}
