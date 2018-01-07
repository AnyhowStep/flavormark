import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { TrNode } from "./../../node/TrNode";
export declare class TrHtmlRenderer extends HtmlSubRenderer<TrNode> {
    constructor();
    render(builder: HtmlBuilder, _node: TrNode, entering: boolean): void;
}
