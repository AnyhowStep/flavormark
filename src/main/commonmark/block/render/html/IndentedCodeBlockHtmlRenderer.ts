import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {IndentedCodeBlockNode} from "./../../node/IndentedCodeBlockNode";
import {escapeXml} from "./../../../../common";

export class IndentedCodeBlockHtmlRenderer extends HtmlSubRenderer<IndentedCodeBlockNode> {
    public constructor () {
        super(IndentedCodeBlockNode);
    }
    public render (builder : HtmlBuilder, node : IndentedCodeBlockNode, entering : boolean) : void {
        if (entering) {
            builder
                .nl()
                .tag("pre")
                .tag("code")
                .append(escapeXml(node.literal, true))
                .tag("/code")
                .tag("/pre")
                .nl();
        }
    }
}
