import { HtmlSubRenderer } from "../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "../../../render/html/HtmlBuilder";
import { ThematicBreakNode } from "./../../block/node/ThematicBreakNode";
export declare class ThematicBreakHtmlRenderer extends HtmlSubRenderer<ThematicBreakNode> {
    constructor();
    render(builder: HtmlBuilder, _node: ThematicBreakNode, entering: boolean): void;
}
