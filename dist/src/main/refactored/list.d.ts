import { BlockParser, BlockParserMeta } from "../BlockParser";
import { Parser } from "../Parser";
import { ListNode } from "./ListNode";
export declare class ListParser extends BlockParser<ListNode> {
    continue(): boolean;
    finalize(parser: Parser, block: ListNode): void;
    canContain(blockParser: BlockParserMeta): boolean;
    acceptsLines: boolean;
    endsWithBlankLineIfLastChildEndsWithBlankLine: boolean;
}
export declare const listParser: ListParser;
