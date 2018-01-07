import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { IndentedCodeBlockNode } from "./../../node/IndentedCodeBlockNode";
export declare class IndentedCodeBlockHtmlRenderer extends HtmlSubRenderer<IndentedCodeBlockNode> {
    constructor();
    render(builder: HtmlBuilder, node: IndentedCodeBlockNode, entering: boolean): void;
}
