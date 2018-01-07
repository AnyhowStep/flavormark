import { BlockParser, BlockNodeCtor } from "../BlockParser";
import { Parser } from "../Parser";
import { Node } from "../Node";
import { HeadingNode } from "./block/node/HeadingNode";
export declare class SetextHeadingParser extends BlockParser<HeadingNode> {
    acceptsLines: boolean;
    parseInlines: boolean;
    isLeaf: boolean;
    constructor(nodeType?: string, nodeCtor?: BlockNodeCtor<HeadingNode>);
    tryStart(parser: Parser, node: Node): boolean;
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
    getString(node: HeadingNode): string;
}
