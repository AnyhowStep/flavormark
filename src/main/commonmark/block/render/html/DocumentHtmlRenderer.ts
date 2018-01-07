import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {DocumentNode} from "./../../node/DocumentNode";

export class DocumentHtmlRenderer extends HtmlSubRenderer<DocumentNode> {
    public constructor () {
        super(DocumentNode);
    }
    public render (_builder : HtmlBuilder, _node : DocumentNode, _entering : boolean) : void {
    }
}
