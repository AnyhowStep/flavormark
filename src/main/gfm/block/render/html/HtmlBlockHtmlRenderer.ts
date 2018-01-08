import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {HtmlBlockNode} from "../../../../commonmark/block/node/HtmlBlockNode";
import {filterTag} from "../../../tag-filter";

export class HtmlBlockHtmlRenderer extends HtmlSubRenderer<HtmlBlockNode> {
    public constructor () {
        super(HtmlBlockNode);
    }
    public render (builder : HtmlBuilder, node : HtmlBlockNode, entering : boolean) : void {
        if (entering) {
            builder
                .nl()
                .append(filterTag(node.literal))
                .nl();
        }
    }
}
