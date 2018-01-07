"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const CodeSpanNode_1 = require("./../../node/CodeSpanNode");
const common_1 = require("./../../../../common");
class CodeSpanHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(CodeSpanNode_1.CodeSpanNode);
    }
    render(builder, node, entering) {
        if (entering) {
            builder
                .tag("code")
                .append(common_1.escapeXml(node.literal, false))
                .tag("/code");
        }
    }
}
exports.CodeSpanHtmlRenderer = CodeSpanHtmlRenderer;
//# sourceMappingURL=CodeSpanHtmlRenderer.js.map