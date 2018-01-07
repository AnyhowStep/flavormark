import { BlockParser, BlockNodeCtor } from "./../../../BlockParser";
import { TextNode } from "./../../../TextNode";
export declare class TextParser extends BlockParser<TextNode> {
    acceptsLines: boolean;
    isLeaf: boolean;
    constructor(nodeCtor?: BlockNodeCtor<TextNode>);
    tryStart(): boolean;
    continue(): boolean;
    finalize(): void;
    canContain(): boolean;
}
