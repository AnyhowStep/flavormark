import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { HeadingNode } from "./../../node/HeadingNode";
export declare class HeadingHtmlRenderer extends HtmlSubRenderer<HeadingNode> {
    constructor();
    render(builder: HtmlBuilder, node: HeadingNode, entering: boolean): void;
}
