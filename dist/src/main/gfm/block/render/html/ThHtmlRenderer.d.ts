import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { ThNode } from "./../../node/ThNode";
export declare class ThHtmlRenderer extends HtmlSubRenderer<ThNode> {
    constructor();
    render(builder: HtmlBuilder, node: ThNode, entering: boolean): void;
}
