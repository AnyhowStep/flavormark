import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {ThNode} from "./../../node/ThNode";

export class ThHtmlRenderer extends HtmlSubRenderer<ThNode> {
    public constructor () {
        super(ThNode);
    }
    public render (builder : HtmlBuilder, node : ThNode, entering : boolean) : void {
        if (entering) {
            if (node.alignment == "left") {
                builder.tag("th");
            } else {
                builder.tag("th", [
                    ["align", node.alignment]
                ]);
            };
        } else {
            builder
                .tag(`/th`)
                .nl();
        }
    }
}
