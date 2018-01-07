import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { SubscriptNode } from "./../../node/SubscriptNode";
export declare class SubscriptHtmlRenderer extends HtmlSubRenderer<SubscriptNode> {
    constructor();
    render(builder: HtmlBuilder, _node: SubscriptNode, entering: boolean): void;
}
