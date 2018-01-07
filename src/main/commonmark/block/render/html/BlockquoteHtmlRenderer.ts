import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {BlockquoteNode} from "./../../node/BlockquoteNode";

export class BlockquoteHtmlRenderer extends HtmlSubRenderer<BlockquoteNode> {
    public constructor () {
        super(BlockquoteNode);
    }
    public render (builder : HtmlBuilder, _node : BlockquoteNode, entering : boolean) : void {
        if (entering) {
            builder
                .nl()
                .tag(`blockquote`)
                .nl();
        } else {
            builder
                .nl()
                .tag(`/blockquote`)
                .nl();
        }
    }
}
