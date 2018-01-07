"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("../../../render/html/HtmlSubRenderer");
const ItemNode_1 = require("./../../block/node/ItemNode");
class ItemHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(ItemNode_1.ItemNode);
    }
    render(builder, _node, entering) {
        if (entering) {
            builder
                .tag(`li`);
        }
        else {
            builder
                .tag(`/li`)
                .nl();
        }
    }
}
exports.ItemHtmlRenderer = ItemHtmlRenderer;
//# sourceMappingURL=ItemHtmlRenderer.js.map