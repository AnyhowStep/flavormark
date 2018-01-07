import { HtmlSubRenderer } from "../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "../../../render/html/HtmlBuilder";
import { ItemNode } from "./../../block/node/ItemNode";
export declare class ItemHtmlRenderer extends HtmlSubRenderer<ItemNode> {
    constructor();
    render(builder: HtmlBuilder, _node: ItemNode, entering: boolean): void;
}
