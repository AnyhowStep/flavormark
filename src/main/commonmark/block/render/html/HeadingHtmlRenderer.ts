import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {HeadingNode} from "./../../node/HeadingNode";

export class HeadingHtmlRenderer extends HtmlSubRenderer<HeadingNode> {
    public constructor () {
        super(HeadingNode);
    }
    public render (builder : HtmlBuilder, node : HeadingNode, entering : boolean) : void {
        if (entering) {
            builder
                .nl()
                .tag(`h${node.level}`);
        } else {
            builder
                .tag(`/h${node.level}`)
                .nl();
        }
    }
}
