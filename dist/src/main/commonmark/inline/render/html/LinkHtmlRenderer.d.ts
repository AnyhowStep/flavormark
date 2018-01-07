import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { LinkNode } from "./../../node/LinkNode";
export declare class LinkHtmlRenderer extends HtmlSubRenderer<LinkNode> {
    constructor();
    render(builder: HtmlBuilder, node: LinkNode, entering: boolean): void;
}
