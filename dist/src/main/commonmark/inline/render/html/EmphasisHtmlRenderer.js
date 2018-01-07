"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const EmphasisNode_1 = require("./../../node/EmphasisNode");
class EmphasisHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(EmphasisNode_1.EmphasisNode);
    }
    render(builder, _node, entering) {
        builder.tag(entering ? "em" : "/em");
    }
}
exports.EmphasisHtmlRenderer = EmphasisHtmlRenderer;
//# sourceMappingURL=EmphasisHtmlRenderer.js.map