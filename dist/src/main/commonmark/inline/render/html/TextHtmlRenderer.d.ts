import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { TextNode } from "./../../../../TextNode";
export declare class TextHtmlRenderer extends HtmlSubRenderer<TextNode> {
    constructor();
    render(builder: HtmlBuilder, node: TextNode, entering: boolean): void;
}
