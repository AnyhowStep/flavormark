import {HtmlSubRenderer} from "../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "../../../render/html/HtmlBuilder";
import {ItemNode} from "./../../block/node/ItemNode";

export class ItemHtmlRenderer extends HtmlSubRenderer<ItemNode> {
    public constructor () {
        super(ItemNode);
    }
    public render (builder : HtmlBuilder, _node : ItemNode, entering : boolean) : void {
        if (entering) {
            builder
                .tag(`li`);
        } else {
            builder
                .tag(`/li`)
                .nl();
        }
    }
}
