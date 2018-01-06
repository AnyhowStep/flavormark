import { BlockParser } from "../BlockParser";
import { Parser } from "../Parser";
import { Node } from "../Node";
export declare class BlockquoteParser extends BlockParser {
    tryStart: (parser: Parser) => boolean;
    continue(parser: Parser): boolean;
    finalize(): void;
    canContain: () => boolean;
    acceptsLines: boolean;
    ignoreLastLineBlank: (_parser: Parser, _container: Node) => boolean;
}
export declare const blockquoteParser: BlockquoteParser;
