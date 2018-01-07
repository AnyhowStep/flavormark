import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { BlockquoteNode } from "./../../node/BlockquoteNode";
export declare class BlockquoteHtmlRenderer extends HtmlSubRenderer<BlockquoteNode> {
    constructor();
    render(builder: HtmlBuilder, _node: BlockquoteNode, entering: boolean): void;
}
