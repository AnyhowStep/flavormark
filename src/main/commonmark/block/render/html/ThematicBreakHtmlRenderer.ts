import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {ThematicBreakNode} from "./../../node/ThematicBreakNode";

export class ThematicBreakHtmlRenderer extends HtmlSubRenderer<ThematicBreakNode> {
    public constructor () {
        super(ThematicBreakNode);
    }
    public render (builder : HtmlBuilder, _node : ThematicBreakNode, entering : boolean) : void {
        if (entering) {
            builder
                .nl()
                .tag("hr", undefined, true)
                .nl();
        }
    }
}
