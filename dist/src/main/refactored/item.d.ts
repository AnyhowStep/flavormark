import { BlockParser, BlockParserMeta } from "./BlockParser";
import { Parser } from "../blocks";
import { Node } from "../node";
import { BlockNode } from "./BlockNode";
import { BlockNodeCtor } from "./BlockParser";
export declare type ItemNodeT = BlockNode;
export declare type ListNodeT = BlockNode;
export declare class ItemParser extends BlockParser {
    private listParser;
    constructor(nodeType: string, nodeCtor: BlockNodeCtor<ItemNodeT>, listParser: BlockParser<ListNodeT>);
    tryStart: (parser: Parser, container: BlockNode) => boolean;
    continue: (parser: Parser, container: Node) => boolean;
    finalize: () => void;
    canContain: (blockParser: BlockParserMeta) => boolean;
    acceptsLines: boolean;
    ignoreLastLineBlank: (parser: Parser, container: Node) => boolean;
    isListItem: boolean;
}
export declare const itemParser: ItemParser;
