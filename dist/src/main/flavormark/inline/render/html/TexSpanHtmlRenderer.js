"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const TexSpanNode_1 = require("./../../node/TexSpanNode");
const common_1 = require("./../../../../commonmark/common");
class TexSpanHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(TexSpanNode_1.TexSpanNode);
    }
    render(builder, node, entering) {
        if (entering) {
            builder
                .tag("span", [
                ["class", "math inline"]
            ])
                .append("\\(", common_1.escapeXml(node.literal, false), "\\)")
                .tag("/span");
        }
    }
}
exports.TexSpanHtmlRenderer = TexSpanHtmlRenderer;
//# sourceMappingURL=TexSpanHtmlRenderer.js.map