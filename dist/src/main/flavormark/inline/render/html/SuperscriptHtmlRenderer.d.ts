import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { SuperscriptNode } from "./../../node/SuperscriptNode";
export declare class SuperscriptHtmlRenderer extends HtmlSubRenderer<SuperscriptNode> {
    constructor();
    render(builder: HtmlBuilder, _node: SuperscriptNode, entering: boolean): void;
}
