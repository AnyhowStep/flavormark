import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { TdNode } from "./../../node/TdNode";
export declare class TdHtmlRenderer extends HtmlSubRenderer<TdNode> {
    constructor();
    render(builder: HtmlBuilder, node: TdNode, entering: boolean): void;
}
