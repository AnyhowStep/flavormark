import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {TrNode} from "./../../node/TrNode";

export class TrHtmlRenderer extends HtmlSubRenderer<TrNode> {
    public constructor () {
        super(TrNode);
    }
    public render (builder : HtmlBuilder, _node : TrNode, entering : boolean) : void {
        if (entering) {
            builder
                .nl()
                .tag(`tr`)
                .nl();
        } else {
            builder
                .tag(`/tr`);
        }
    }
}
