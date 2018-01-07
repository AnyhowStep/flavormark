import { BlockParser, BlockNodeCtor } from "../BlockParser";
import { Parser } from "../Parser";
import { RefMap } from "../refactored-misc/RefMap";
import { ParagraphNode } from "./block/node/ParagraphNode";
export declare class ParagraphParser extends BlockParser<ParagraphNode> {
    acceptsLines: boolean;
    parseInlines: boolean;
    acceptLazyContinuation: boolean;
    isLeaf: boolean;
    isParagraph: boolean;
    private refMap;
    constructor(refMap: RefMap, nodeType?: string, nodeCtor?: BlockNodeCtor<ParagraphNode>);
    reinit(): void;
    continue(parser: Parser): boolean;
    finalize(_parser: Parser, node: ParagraphNode): void;
    canContain(): boolean;
    appendString(node: ParagraphNode, str: string): void;
    setString(node: ParagraphNode, str: string): void;
    getString(node: ParagraphNode): string;
}
