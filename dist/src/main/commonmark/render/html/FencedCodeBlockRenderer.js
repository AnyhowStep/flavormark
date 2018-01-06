"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("../../../render/html/HtmlSubRenderer");
const FencedCodeBlockNode_1 = require("../../FencedCodeBlockNode");
const common_1 = require("../../../common");
class FencedCodeBlockHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(FencedCodeBlockNode_1.FencedCodeBlockNode);
    }
    render(builder, node, entering) {
        if (entering) {
            const info = (node.info == "") ?
                [] :
                node.info.split(/\s+/);
            const attrs = [];
            if (info.length > 0 && info[0].length > 0) {
                attrs.push(["class", `language-${common_1.escapeXml(info[0], true)}`]);
            }
            builder
                .nl()
                .tag("pre")
                .tag("code", attrs)
                .append(common_1.escapeXml(node.literal, true))
                .tag("/code")
                .tag("/pre")
                .nl();
        }
    }
}
exports.FencedCodeBlockHtmlRenderer = FencedCodeBlockHtmlRenderer;
//# sourceMappingURL=FencedCodeBlockRenderer.js.map