import { HtmlSubRenderer } from "../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "../../../render/html/HtmlBuilder";
import { ParagraphNode } from "./../../block/node/ParagraphNode";
export declare class ParagraphHtmlRenderer extends HtmlSubRenderer<ParagraphNode> {
    constructor();
    render(builder: HtmlBuilder, _node: ParagraphNode, entering: boolean): void;
}
