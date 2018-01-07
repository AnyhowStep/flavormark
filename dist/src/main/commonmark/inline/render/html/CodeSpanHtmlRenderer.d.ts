import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { CodeSpanNode } from "./../../node/CodeSpanNode";
export declare class CodeSpanHtmlRenderer extends HtmlSubRenderer<CodeSpanNode> {
    constructor();
    render(builder: HtmlBuilder, node: CodeSpanNode, entering: boolean): void;
}
