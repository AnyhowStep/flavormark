import { HtmlSubRenderer } from "../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "../../../render/html/HtmlBuilder";
import { ListNode } from "../../ListNode";
export declare class ListHtmlRenderer extends HtmlSubRenderer<ListNode> {
    constructor();
    render(builder: HtmlBuilder, node: ListNode, entering: boolean): void;
}
