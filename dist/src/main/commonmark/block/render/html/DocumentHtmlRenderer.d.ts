import { HtmlSubRenderer } from "./../../../../render/html/HtmlSubRenderer";
import { HtmlBuilder } from "./../../../../render/html/HtmlBuilder";
import { DocumentNode } from "./../../node/DocumentNode";
export declare class DocumentHtmlRenderer extends HtmlSubRenderer<DocumentNode> {
    constructor();
    render(_builder: HtmlBuilder, _node: DocumentNode, _entering: boolean): void;
}
