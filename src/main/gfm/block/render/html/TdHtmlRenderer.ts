import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {TdNode} from "./../../node/TdNode";

export class TdHtmlRenderer extends HtmlSubRenderer<TdNode> {
    public constructor () {
        super(TdNode);
    }
    public render (builder : HtmlBuilder, node : TdNode, entering : boolean) : void {
        if (entering) {
            if (node.alignment == "left") {
                builder.tag("td");
            } else {
                builder.tag("td", [
                    ["align", node.alignment]
                ]);
            };
        } else {
            builder
                .tag(`/td`)
                .nl();
        }
    }
}
