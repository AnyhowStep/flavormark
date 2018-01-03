import { BlockParser, BlockParserMeta } from "./BlockParser";
import { Parser } from "../blocks";
import { ListNode } from "./ListNode";
export declare class ListParser extends BlockParser<ListNode> {
    continue: () => boolean;
    finalize: (parser: Parser, block: ListNode) => void;
    canContain: (blockParser: BlockParserMeta) => boolean;
    acceptsLines: boolean;
    isList: boolean;
}
export declare const listParser: ListParser;
