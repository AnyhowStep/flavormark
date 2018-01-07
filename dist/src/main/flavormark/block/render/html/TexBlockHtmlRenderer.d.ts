import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { TexBlockNode } from "./../../node/TexBlockNode";
export declare class TexBlockHtmlRenderer extends HtmlSubRenderer<TexBlockNode> {
    constructor();
    render(builder: HtmlBuilder, node: TexBlockNode, entering: boolean): void;
}
