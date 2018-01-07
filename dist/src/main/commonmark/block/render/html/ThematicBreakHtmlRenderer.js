"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const ThematicBreakNode_1 = require("./../../node/ThematicBreakNode");
class ThematicBreakHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(ThematicBreakNode_1.ThematicBreakNode);
    }
    render(builder, _node, entering) {
        if (entering) {
            builder
                .nl()
                .tag("hr", undefined, true)
                .nl();
        }
    }
}
exports.ThematicBreakHtmlRenderer = ThematicBreakHtmlRenderer;
//# sourceMappingURL=ThematicBreakHtmlRenderer.js.map