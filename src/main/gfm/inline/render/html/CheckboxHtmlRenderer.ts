import {HtmlSubRenderer} from "./../../../../render/html/HtmlSubRenderer";
import {HtmlBuilder} from "./../../../../render/html/HtmlBuilder";
import {CheckboxNode} from "./../../node/CheckboxNode";

export class CheckboxHtmlRenderer extends HtmlSubRenderer<CheckboxNode> {
    public constructor () {
        super(CheckboxNode);
    }
    public render (builder : HtmlBuilder, node : CheckboxNode, entering : boolean) : void {
        if (entering) {
            builder.append(`<input `);
            if (node.checked) {
                builder.append(`checked="" `);
            }
            builder.append(`disabled="" type="checkbox">`);
        }
    }
}
