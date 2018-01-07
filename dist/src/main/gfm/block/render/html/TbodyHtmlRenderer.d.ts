import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { TbodyNode } from "./../../node/TbodyNode";
export declare class TbodyHtmlRenderer extends HtmlSubRenderer<TbodyNode> {
    constructor();
    render(builder: HtmlBuilder, _node: TbodyNode, entering: boolean): void;
}
