"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const SoftbreakNode_1 = require("./../../node/SoftbreakNode");
class SoftbreakHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(SoftbreakNode_1.SoftbreakNode);
    }
    render(builder, _node, entering) {
        if (entering) {
            builder.append("\n");
        }
    }
}
exports.SoftbreakHtmlRenderer = SoftbreakHtmlRenderer;
//# sourceMappingURL=SoftbreakHtmlRenderer.js.map