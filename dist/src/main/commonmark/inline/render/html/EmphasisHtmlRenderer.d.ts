import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { EmphasisNode } from "./../../node/EmphasisNode";
export declare class EmphasisHtmlRenderer extends HtmlSubRenderer<EmphasisNode> {
    constructor();
    render(builder: HtmlBuilder, _node: EmphasisNode, entering: boolean): void;
}
