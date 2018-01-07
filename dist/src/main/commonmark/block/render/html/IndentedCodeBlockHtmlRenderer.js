"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const IndentedCodeBlockNode_1 = require("./../../node/IndentedCodeBlockNode");
const common_1 = require("./../../../common");
class IndentedCodeBlockHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(IndentedCodeBlockNode_1.IndentedCodeBlockNode);
    }
    render(builder, node, entering) {
        if (entering) {
            builder
                .nl()
                .tag("pre")
                .tag("code")
                .append(common_1.escapeXml(node.literal, false))
                .tag("/code")
                .tag("/pre")
                .nl();
        }
    }
}
exports.IndentedCodeBlockHtmlRenderer = IndentedCodeBlockHtmlRenderer;
//# sourceMappingURL=IndentedCodeBlockHtmlRenderer.js.map