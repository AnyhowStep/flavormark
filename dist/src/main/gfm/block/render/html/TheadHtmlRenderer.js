"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const TheadNode_1 = require("./../../node/TheadNode");
class TheadHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(TheadNode_1.TheadNode);
    }
    render(builder, _node, entering) {
        if (entering) {
            builder
                .tag(`thead`)
                .nl();
        }
        else {
            builder
                .nl()
                .tag(`/thead`);
        }
    }
}
exports.TheadHtmlRenderer = TheadHtmlRenderer;
//# sourceMappingURL=TheadHtmlRenderer.js.map