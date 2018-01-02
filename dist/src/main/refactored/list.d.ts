import { BlockParser, BlockParserMeta } from "./BlockParser";
import { Parser } from "../blocks";
import { BlockNode } from "./BlockNode";
export declare class ListParser extends BlockParser {
    continue: () => boolean;
    finalize: (parser: Parser, block: BlockNode) => void;
    canContain: (blockParser: BlockParserMeta) => boolean;
    acceptsLines: boolean;
    isList: boolean;
}
export declare const listParser: ListParser;
