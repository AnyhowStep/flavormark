"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("../../../render/html/HtmlSubRenderer");
const ListNode_1 = require("./../../block/node/ListNode");
class ListHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(ListNode_1.ListNode);
    }
    render(builder, node, entering) {
        const tagname = (node.listData.type == "bullet") ?
            "ul" : "ol";
        const attrs = [];
        if (entering) {
            const start = node.listData.start;
            if (start != undefined && start != 1) {
                attrs.push(['start', start.toString()]);
            }
            builder
                .nl()
                .tag(tagname, attrs)
                .nl();
        }
        else {
            builder
                .nl()
                .tag(`/${tagname}`)
                .nl();
        }
    }
}
exports.ListHtmlRenderer = ListHtmlRenderer;
//# sourceMappingURL=ListHtmlRenderer.js.map