import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { HtmlTagNode } from "../../../../commonmark/inline/node/HtmlTagNode";
export declare class HtmlTagHtmlRenderer extends HtmlSubRenderer<HtmlTagNode> {
    constructor();
    render(builder: HtmlBuilder, node: HtmlTagNode, entering: boolean): void;
}
