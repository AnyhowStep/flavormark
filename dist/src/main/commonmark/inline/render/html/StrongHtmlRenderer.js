"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const StrongNode_1 = require("./../../node/StrongNode");
class StrongHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(StrongNode_1.StrongNode);
    }
    render(builder, _node, entering) {
        builder.tag(entering ? "strong" : "/strong");
    }
}
exports.StrongHtmlRenderer = StrongHtmlRenderer;
//# sourceMappingURL=StrongHtmlRenderer.js.map