"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const TdNode_1 = require("./../../node/TdNode");
class TdHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(TdNode_1.TdNode);
    }
    render(builder, node, entering) {
        if (entering) {
            if (node.alignment == "left") {
                builder.tag("td");
            }
            else {
                builder.tag("td", [
                    ["align", node.alignment]
                ]);
            }
            ;
        }
        else {
            builder
                .tag(`/td`)
                .nl();
        }
    }
}
exports.TdHtmlRenderer = TdHtmlRenderer;
//# sourceMappingURL=TdHtmlRenderer.js.map