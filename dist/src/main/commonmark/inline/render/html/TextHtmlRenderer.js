"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const TextNode_1 = require("./../../../../TextNode");
const common_1 = require("./../../../../common");
class TextHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(TextNode_1.TextNode);
    }
    render(builder, node, entering) {
        if (entering) {
            builder.append(common_1.escapeXml(node.literal, false));
        }
    }
}
exports.TextHtmlRenderer = TextHtmlRenderer;
//# sourceMappingURL=TextHtmlRenderer.js.map