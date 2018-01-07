import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {StrikethroughNode} from "./../../node/StrikethroughNode";

export class StrikethroughHtmlRenderer extends HtmlSubRenderer<StrikethroughNode> {
    public constructor () {
        super(StrikethroughNode);
    }
    public render (builder : HtmlBuilder, _node : StrikethroughNode, entering : boolean) : void {
        builder.tag(entering ? 'del' : '/del');
    }
}
