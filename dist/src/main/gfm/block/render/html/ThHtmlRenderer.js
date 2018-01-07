"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const ThNode_1 = require("./../../node/ThNode");
class ThHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(ThNode_1.ThNode);
    }
    render(builder, node, entering) {
        if (entering) {
            if (node.alignment == "left") {
                builder.tag("th");
            }
            else {
                builder.tag("th", [
                    ["align", node.alignment]
                ]);
            }
            ;
        }
        else {
            builder
                .tag(`/th`)
                .nl();
        }
    }
}
exports.ThHtmlRenderer = ThHtmlRenderer;
//# sourceMappingURL=ThHtmlRenderer.js.map