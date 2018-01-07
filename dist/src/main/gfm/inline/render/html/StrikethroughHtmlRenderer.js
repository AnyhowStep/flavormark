"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const StrikethroughNode_1 = require("./../../node/StrikethroughNode");
class StrikethroughHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(StrikethroughNode_1.StrikethroughNode);
    }
    render(builder, _node, entering) {
        builder.tag(entering ? 'del' : '/del');
    }
}
exports.StrikethroughHtmlRenderer = StrikethroughHtmlRenderer;
//# sourceMappingURL=StrikethroughHtmlRenderer.js.map