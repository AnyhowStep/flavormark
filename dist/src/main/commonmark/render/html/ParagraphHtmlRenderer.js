"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("../../../render/html/HtmlSubRenderer");
const ParagraphNode_1 = require("../../ParagraphNode");
class ParagraphHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(ParagraphNode_1.ParagraphNode);
    }
    render(builder, _node, entering) {
        if (entering) {
            builder
                .nl()
                .tag("p");
        }
        else {
            builder
                .tag("/p")
                .nl();
        }
    }
}
exports.ParagraphHtmlRenderer = ParagraphHtmlRenderer;
//# sourceMappingURL=ParagraphHtmlRenderer.js.map