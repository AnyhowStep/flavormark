"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const SubscriptNode_1 = require("./../../node/SubscriptNode");
class SubscriptHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(SubscriptNode_1.SubscriptNode);
    }
    render(builder, _node, entering) {
        builder.tag(entering ? "sub" : "/sub");
    }
}
exports.SubscriptHtmlRenderer = SubscriptHtmlRenderer;
//# sourceMappingURL=SubscriptHtmlRenderer.js.map