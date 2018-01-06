import { HtmlSubRenderer } from "../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "../../../render/html/HtmlBuilder";
import { FencedCodeBlockNode } from "../../FencedCodeBlockNode";
export declare class FencedCodeBlockHtmlRenderer extends HtmlSubRenderer<FencedCodeBlockNode> {
    constructor();
    render(builder: HtmlBuilder, node: FencedCodeBlockNode, entering: boolean): void;
}
