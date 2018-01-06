import { BlockParser, BlockParserMeta, BlockNodeCtor } from "../BlockParser";
import { Parser } from "../Parser";
import { ListNode } from "./ListNode";
import { Node } from "../Node";
export declare class ListParser extends BlockParser<ListNode> {
    acceptsLines: boolean;
    endsWithBlankLineIfLastChildEndsWithBlankLine: boolean;
    constructor(nodeType?: string, nodeCtor?: BlockNodeCtor<ListNode>);
    continue(): boolean;
    finalize(parser: Parser, block: ListNode): void;
    canContain(_blockParser: BlockParserMeta, node: Node): boolean;
}
