import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {SubscriptNode} from "./../../node/SubscriptNode";

export class SubscriptHtmlRenderer extends HtmlSubRenderer<SubscriptNode> {
    public constructor () {
        super(SubscriptNode);
    }
    public render (builder : HtmlBuilder, _node : SubscriptNode, entering : boolean) : void {
        builder.tag(entering ? "sub" : "/sub");
    }
}
