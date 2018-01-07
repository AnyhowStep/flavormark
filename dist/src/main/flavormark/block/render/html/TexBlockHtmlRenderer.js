"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const TexBlockNode_1 = require("./../../node/TexBlockNode");
const common_1 = require("./../../../../common");
class TexBlockHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(TexBlockNode_1.TexBlockNode);
    }
    render(builder, node, entering) {
        if (entering) {
            builder
                .tag("latex_block")
                .append(common_1.escapeXml(node.literal, false))
                .tag("/latex_block")
                .nl();
        }
    }
}
exports.TexBlockHtmlRenderer = TexBlockHtmlRenderer;
//# sourceMappingURL=TexBlockHtmlRenderer.js.map