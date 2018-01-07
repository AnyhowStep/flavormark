import { BlockParser, BlockNodeCtor } from "../BlockParser";
import { Parser } from "../Parser";
import { ThematicBreakNode } from "./block/node/ThematicBreakNode";
export declare class ThematicBreakParser extends BlockParser<ThematicBreakNode> {
    acceptsLines: boolean;
    isLeaf: boolean;
    constructor(nodeType?: string, nodeCtor?: BlockNodeCtor<ThematicBreakNode>);
    tryStart(parser: Parser): boolean;
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
}
