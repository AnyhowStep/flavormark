import { BlockParser, BlockParserMeta, BlockNodeCtor } from "./../../../BlockParser";
import { Parser } from "./../../../Parser";
import { ListNode } from "./../node/ListNode";
import { Node } from "./../../../Node";
export declare class ListParser extends BlockParser<ListNode> {
    acceptsLines: boolean;
    endsWithBlankLineIfLastChildEndsWithBlankLine: boolean;
    constructor(nodeCtor?: BlockNodeCtor<ListNode>);
    continue(): boolean;
    finalize(parser: Parser, node: ListNode): void;
    canContain(_blockParser: BlockParserMeta, node: Node): boolean;
}
