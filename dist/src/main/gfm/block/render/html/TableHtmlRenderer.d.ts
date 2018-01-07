import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { TableNode } from "./../../node/TableNode";
export declare class TableHtmlRenderer extends HtmlSubRenderer<TableNode> {
    constructor();
    render(builder: HtmlBuilder, _node: TableNode, entering: boolean): void;
}
