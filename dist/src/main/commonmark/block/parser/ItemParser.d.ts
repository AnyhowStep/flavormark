import { BlockParser, BlockParserMeta, BlockNodeCtor } from "./../../../BlockParser";
import { Parser } from "./../../../Parser";
import { Node } from "./../../../Node";
import { ListNode } from "./../node/ListNode";
import { ItemNode } from "./../node/ItemNode";
export declare class ItemParser extends BlockParser<ItemNode> {
    acceptsLines: boolean;
    endsWithBlankLineIfLastChildEndsWithBlankLine: boolean;
    private listParser;
    constructor(listParser: BlockParser<ListNode>, nodeCtor?: BlockNodeCtor<ItemNode>);
    tryStart(parser: Parser, node: Node): boolean;
    continue(parser: Parser, node: ItemNode): boolean;
    finalize(): void;
    canContain(_blockParser: BlockParserMeta, node: Node): boolean;
    canBeContainedBy(_blockParser: BlockParserMeta, node: Node): boolean;
    ignoreLastLineBlank(parser: Parser, node: Node): boolean;
}
