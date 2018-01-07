"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const HeadingNode_1 = require("./../../node/HeadingNode");
class HeadingHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(HeadingNode_1.HeadingNode);
    }
    render(builder, node, entering) {
        if (entering) {
            builder
                .nl()
                .tag(`h${node.level}`);
        }
        else {
            builder
                .tag(`/h${node.level}`)
                .nl();
        }
    }
}
exports.HeadingHtmlRenderer = HeadingHtmlRenderer;
//# sourceMappingURL=HeadingHtmlRenderer.js.map