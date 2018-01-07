import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {TexSpanNode} from "./../../node/TexSpanNode";
import {escapeXml} from "./../../../../common";

export class TexSpanHtmlRenderer extends HtmlSubRenderer<TexSpanNode> {
    public constructor () {
        super(TexSpanNode);
    }
    public render (builder : HtmlBuilder, node : TexSpanNode, entering : boolean) : void {
        if (entering) {
            builder
                .tag("latex")
                .append(escapeXml(node.literal, false))
                .tag("/latex");
        }
    }
}
