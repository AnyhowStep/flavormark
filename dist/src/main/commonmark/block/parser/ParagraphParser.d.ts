import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { Parser } from "./../../../Parser";
import { ParagraphNode } from "./../node/ParagraphNode";
import { ParagraphContentParser } from "./ParagraphContentParser";
export declare class ParagraphParser extends BlockParser<ParagraphNode> {
    acceptsLines: boolean;
    parseInlines: boolean;
    acceptLazyContinuation: boolean;
    isLeaf: boolean;
    isParagraph: boolean;
    private contentParsers;
    constructor(contentParsers: ParagraphContentParser[], nodeCtor?: BlockNodeCtor<ParagraphNode>);
    reinit(): void;
    continue(parser: Parser): boolean;
    finalize(parser: Parser, node: ParagraphNode): void;
    canContain(): boolean;
    appendString(node: ParagraphNode, str: string): void;
    setString(node: ParagraphNode, str: string): void;
    getString(node: ParagraphNode): string;
}
