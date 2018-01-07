import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { StrikethroughNode } from "./../../node/StrikethroughNode";
export declare class StrikethroughHtmlRenderer extends HtmlSubRenderer<StrikethroughNode> {
    constructor();
    render(builder: HtmlBuilder, _node: StrikethroughNode, entering: boolean): void;
}
