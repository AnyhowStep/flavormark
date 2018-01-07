import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { TexSpanNode } from "./../../node/TexSpanNode";
export declare class TexSpanHtmlRenderer extends HtmlSubRenderer<TexSpanNode> {
    constructor();
    render(builder: HtmlBuilder, node: TexSpanNode, entering: boolean): void;
}
