import { BlockParser } from "../BlockParser";
import { Parser } from "../Parser";
export declare class ThematicBreakParser extends BlockParser {
    tryStart: (parser: Parser) => boolean;
    continue(): boolean;
    finalize: () => void;
    canContain: () => boolean;
    acceptsLines: boolean;
    isLeaf: boolean;
}
export declare const thematicBreakParser: ThematicBreakParser;
