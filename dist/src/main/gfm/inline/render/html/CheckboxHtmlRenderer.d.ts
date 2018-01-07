import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { CheckboxNode } from "./../../node/CheckboxNode";
export declare class CheckboxHtmlRenderer extends HtmlSubRenderer<CheckboxNode> {
    constructor();
    render(builder: HtmlBuilder, node: CheckboxNode, entering: boolean): void;
}
