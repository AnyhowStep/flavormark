import {HtmlSubRenderer} from "../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "../../../render/html/HtmlBuilder";
import {ListNode} from "./../../block/node/ListNode";

export class ListHtmlRenderer extends HtmlSubRenderer<ListNode> {
    public constructor () {
        super(ListNode);
    }
    public render (builder : HtmlBuilder, node : ListNode, entering : boolean) : void {
        const tagname = (node.listData.type == "bullet") ?
            "ul" : "ol"
        const attrs : [string, string][] = [];

        if (entering) {
            const start = node.listData.start;
            if (start != undefined && start != 1) {
                attrs.push(['start', start.toString()]);
            }
            builder
                .nl()
                .tag(tagname, attrs)
                .nl();
        } else {
            builder
                .nl()
                .tag(`/${tagname}`)
                .nl();
        }
    }
}
