import { BlockParser } from "../BlockParser";
import { Parser } from "../Parser";
import { Node } from "../Node";
import { HeadingNode } from "../commonmark/HeadingNode";
export declare class SetextHeadingParser extends BlockParser<HeadingNode> {
    tryStart(parser: Parser, container: Node): boolean;
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
    acceptsLines: boolean;
    parseInlines: boolean;
    isLeaf: boolean;
    getString(node: HeadingNode): string;
}
export declare const setextHeadingParser: SetextHeadingParser;
