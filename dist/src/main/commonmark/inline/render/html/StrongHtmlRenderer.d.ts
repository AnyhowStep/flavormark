import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { StrongNode } from "./../../node/StrongNode";
export declare class StrongHtmlRenderer extends HtmlSubRenderer<StrongNode> {
    constructor();
    render(builder: HtmlBuilder, _node: StrongNode, entering: boolean): void;
}
