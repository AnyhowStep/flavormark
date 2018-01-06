import { BlockParser } from "../BlockParser";
import { Parser } from "../Parser";
export declare class BlockquoteParser extends BlockParser {
    tryStart(parser: Parser): boolean;
    continue(parser: Parser): boolean;
    finalize(): void;
    canContain: () => boolean;
    acceptsLines: boolean;
    ignoreLastLineBlank(): boolean;
}
export declare const blockquoteParser: BlockquoteParser;
