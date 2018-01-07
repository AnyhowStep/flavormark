import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {TexBlockNode} from "./../../node/TexBlockNode";
import {escapeXml} from "./../../../../commonmark/common";

export class TexBlockHtmlRenderer extends HtmlSubRenderer<TexBlockNode> {
    public constructor () {
        super(TexBlockNode);
    }
    public render (builder : HtmlBuilder, node : TexBlockNode, entering : boolean) : void {
        if (entering) {
            builder
                .tag("latex_block")
                .append(escapeXml(node.literal, false))
                .tag("/latex_block")
                .nl();
        }
    }
}
