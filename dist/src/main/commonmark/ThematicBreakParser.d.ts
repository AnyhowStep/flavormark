import { BlockParser, BlockNodeCtor } from "../BlockParser";
import { Parser } from "../Parser";
import { Node } from "../Node";
export declare class ThematicBreakParser extends BlockParser {
    acceptsLines: boolean;
    isLeaf: boolean;
    constructor(nodeType?: string, nodeCtor?: BlockNodeCtor<Node>);
    tryStart(parser: Parser): boolean;
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
}
