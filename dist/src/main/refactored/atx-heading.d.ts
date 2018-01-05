import { Parser } from "../Parser";
import { BlockParser } from "./BlockParser";
import { HeadingNode } from "./HeadingNode";
export declare class AtxHeadingParser extends BlockParser<HeadingNode> {
    tryStart: (parser: Parser) => boolean;
    continue: () => boolean;
    finalize: () => void;
    canContain: () => boolean;
    acceptsLines: boolean;
    parseInlines: boolean;
    isLeaf: boolean;
    getString(node: HeadingNode): string;
    unsetString(node: HeadingNode): void;
}
export declare const atxHeadingParser: AtxHeadingParser;
