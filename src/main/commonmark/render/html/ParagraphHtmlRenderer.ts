import {HtmlSubRenderer} from "../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "../../../render/html/HtmlBuilder";
import {ParagraphNode} from "./../../block/node/ParagraphNode";

export class ParagraphHtmlRenderer extends HtmlSubRenderer<ParagraphNode> {
    public constructor () {
        super(ParagraphNode);
    }
    public render (builder : HtmlBuilder, _node : ParagraphNode, entering : boolean) : void {
        if (entering) {
            builder
                .nl()
                .tag("p");
        } else {
            builder
                .tag("/p")
                .nl();
        }
    }
}
