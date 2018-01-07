"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const TrNode_1 = require("./../../node/TrNode");
class TrHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(TrNode_1.TrNode);
    }
    render(builder, _node, entering) {
        if (entering) {
            builder
                .nl()
                .tag(`tr`)
                .nl();
        }
        else {
            builder
                .tag(`/tr`);
        }
    }
}
exports.TrHtmlRenderer = TrHtmlRenderer;
//# sourceMappingURL=TrHtmlRenderer.js.map