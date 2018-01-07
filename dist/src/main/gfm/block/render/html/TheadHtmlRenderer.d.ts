import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { TheadNode } from "./../../node/TheadNode";
export declare class TheadHtmlRenderer extends HtmlSubRenderer<TheadNode> {
    constructor();
    render(builder: HtmlBuilder, _node: TheadNode, entering: boolean): void;
}
