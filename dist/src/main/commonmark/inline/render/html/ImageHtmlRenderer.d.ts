import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { ImageNode } from "./../../node/ImageNode";
export declare class ImageHtmlRenderer extends HtmlSubRenderer<ImageNode> {
    constructor();
    render(builder: HtmlBuilder, node: ImageNode, entering: boolean): void;
}
