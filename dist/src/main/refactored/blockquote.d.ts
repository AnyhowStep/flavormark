import { BlockParser, BlockParserMeta } from "./BlockParser";
import { Parser } from "../blocks";
import { Node } from "../node";
export declare class BlockquoteParser extends BlockParser {
    tryStart: (parser: Parser) => boolean;
    continue: (parser: Parser) => boolean;
    finalize: () => void;
    canContain: (blockParser: BlockParserMeta) => boolean;
    acceptsLines: boolean;
    ignoreLastLineBlank: (_parser: Parser, _container: Node) => boolean;
}
export declare const blockquoteParser: BlockquoteParser;
