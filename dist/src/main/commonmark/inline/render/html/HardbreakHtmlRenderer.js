"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const HardbreakNode_1 = require("./../../node/HardbreakNode");
class HardbreakHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(HardbreakNode_1.HardbreakNode);
    }
    render(builder, _node, entering) {
        if (entering) {
            builder
                .tag("br", undefined, true)
                .nl();
        }
    }
}
exports.HardbreakHtmlRenderer = HardbreakHtmlRenderer;
//# sourceMappingURL=HardbreakHtmlRenderer.js.map