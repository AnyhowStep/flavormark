"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const TexBlockNode_1 = require("./../../node/TexBlockNode");
const common_1 = require("./../../../../commonmark/common");
class TexBlockHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(TexBlockNode_1.TexBlockNode);
    }
    render(builder, node, entering) {
        if (entering) {
            builder
                .tag("span", [
                ["class", "math display"]
            ])
                .append("\\[", common_1.escapeXml(node.literal, false), "\\]")
                .tag("/span")
                .nl();
        }
    }
}
exports.TexBlockHtmlRenderer = TexBlockHtmlRenderer;
//# sourceMappingURL=TexBlockHtmlRenderer.js.map