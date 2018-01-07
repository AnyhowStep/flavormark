import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {TableNode} from "./../../node/TableNode";

export class TableHtmlRenderer extends HtmlSubRenderer<TableNode> {
    public constructor () {
        super(TableNode);
    }
    public render (builder : HtmlBuilder, _node : TableNode, entering : boolean) : void {
        if (entering) {
            builder
                .tag(`table`)
                .nl();
        } else {
            builder
                .tag(`/table`)
                .nl();
        }
    }
}
