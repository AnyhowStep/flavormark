import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { HtmlBlockNode } from "./../../node/HtmlBlockNode";
export declare class HtmlBlockHtmlRenderer extends HtmlSubRenderer<HtmlBlockNode> {
    constructor();
    render(builder: HtmlBuilder, node: HtmlBlockNode, entering: boolean): void;
}
