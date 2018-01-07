import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { SoftbreakNode } from "./../../node/SoftbreakNode";
export declare class SoftbreakHtmlRenderer extends HtmlSubRenderer<SoftbreakNode> {
    constructor();
    render(builder: HtmlBuilder, _node: SoftbreakNode, entering: boolean): void;
}
