import {HtmlSubRenderer} from "../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "../../../render/html/HtmlBuilder";
import {FencedCodeBlockNode} from "./../../block/node/FencedCodeBlockNode";
import {escapeXml} from "../../../common";

export class FencedCodeBlockHtmlRenderer extends HtmlSubRenderer<FencedCodeBlockNode> {
    public constructor () {
        super(FencedCodeBlockNode);
    }
    public render (builder : HtmlBuilder, node : FencedCodeBlockNode, entering : boolean) : void {
        if (entering) {
            const info = (node.info == "") ?
                [] :
                node.info.split(/\s+/);
            const attrs : [string, string][] = [];
            if (info.length > 0 && info[0].length > 0) {
                attrs.push(["class", `language-${escapeXml(info[0], true)}`])
            }
            builder
                .nl()
                .tag("pre")
                .tag("code", attrs)
                .append(escapeXml(node.literal, true))
                .tag("/code")
                .tag("/pre")
                .nl();
        }
    }
}
