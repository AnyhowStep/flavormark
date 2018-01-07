"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const HtmlTagNode_1 = require("./../../node/HtmlTagNode");
class HtmlTagHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(HtmlTagNode_1.HtmlTagNode);
    }
    render(builder, node, entering) {
        if (entering) {
            builder.append(node.literal);
        }
    }
}
exports.HtmlTagHtmlRenderer = HtmlTagHtmlRenderer;
//# sourceMappingURL=HtmlTagHtmlRenderer.js.map