import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {TheadNode} from "./../../node/TheadNode";

export class TheadHtmlRenderer extends HtmlSubRenderer<TheadNode> {
    public constructor () {
        super(TheadNode);
    }
    public render (builder : HtmlBuilder, _node : TheadNode, entering : boolean) : void {
        if (entering) {
            builder
                .tag(`thead`)
                .nl();
        } else {
            builder
                .nl()
                .tag(`/thead`);
        }
    }
}
