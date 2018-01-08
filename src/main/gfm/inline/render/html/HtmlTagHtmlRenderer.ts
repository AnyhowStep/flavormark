import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {HtmlTagNode} from "../../../../commonmark/inline/node/HtmlTagNode";
import {filterTag} from "../../../tag-filter";

export class HtmlTagHtmlRenderer extends HtmlSubRenderer<HtmlTagNode> {
    public constructor () {
        super(HtmlTagNode);
    }
    public render (builder : HtmlBuilder, node : HtmlTagNode, entering : boolean) : void {
        if (entering) {
            builder.append(filterTag(node.literal));
        }
    }
}
