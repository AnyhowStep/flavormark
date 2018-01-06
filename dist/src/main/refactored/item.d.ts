import { BlockParser, BlockParserMeta, BlockNodeCtor } from "../BlockParser";
import { Parser } from "../Parser";
import { Node } from "../Node";
import { ListNode } from "./ListNode";
import { ItemNode } from "./ItemNode";
export declare class ItemParser extends BlockParser<ItemNode> {
    private listParser;
    constructor(nodeType: string, nodeCtor: BlockNodeCtor<ItemNode>, listParser: BlockParser<ListNode>);
    tryStart(parser: Parser, container: Node): boolean;
    continue(parser: Parser, container: ItemNode): boolean;
    finalize(): void;
    canContain(blockParser: BlockParserMeta): boolean;
    canBeContainedBy(blockParser: BlockParserMeta): boolean;
    acceptsLines: boolean;
    ignoreLastLineBlank(parser: Parser, container: Node): boolean;
    endsWithBlankLineIfLastChildEndsWithBlankLine: boolean;
}
