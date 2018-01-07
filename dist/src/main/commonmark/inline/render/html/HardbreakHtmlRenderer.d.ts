import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { HardbreakNode } from "./../../node/HardbreakNode";
export declare class HardbreakHtmlRenderer extends HtmlSubRenderer<HardbreakNode> {
    constructor();
    render(builder: HtmlBuilder, _node: HardbreakNode, entering: boolean): void;
}
