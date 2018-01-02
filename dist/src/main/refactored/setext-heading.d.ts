import { BlockParser } from "./BlockParser";
import { Parser } from "../blocks";
import { BlockNode } from "./BlockNode";
import { HeadingNode } from "./HeadingNode";
export declare class SetextHeadingParser extends BlockParser<HeadingNode> {
    tryStart: (parser: Parser, container: BlockNode) => boolean;
    continue: () => boolean;
    finalize: () => void;
    canContain: () => boolean;
    acceptsLines: boolean;
    parseInlines: boolean;
    isLeaf: boolean;
    getString(node: BlockNode): string;
    unsetString(node: BlockNode): void;
}
export declare const setextHeadingParser: SetextHeadingParser;
