import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {SuperscriptNode} from "./../../node/SuperscriptNode";

export class SuperscriptHtmlRenderer extends HtmlSubRenderer<SuperscriptNode> {
    public constructor () {
        super(SuperscriptNode);
    }
    public render (builder : HtmlBuilder, _node : SuperscriptNode, entering : boolean) : void {
        builder.tag(entering ? "sup" : "/sup");
    }
}
