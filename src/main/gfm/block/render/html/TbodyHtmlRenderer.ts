import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {TbodyNode} from "./../../node/TbodyNode";

export class TbodyHtmlRenderer extends HtmlSubRenderer<TbodyNode> {
    public constructor () {
        super(TbodyNode);
    }
    public render (builder : HtmlBuilder, _node : TbodyNode, entering : boolean) : void {
        if (entering) {
            builder
                .nl()
                .tag(`tbody`)
                .nl();
        } else {
            builder
                .tag(`/tbody`);
        }
    }
}
