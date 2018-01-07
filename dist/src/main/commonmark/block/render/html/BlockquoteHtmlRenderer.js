"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const BlockquoteNode_1 = require("./../../node/BlockquoteNode");
class BlockquoteHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(BlockquoteNode_1.BlockquoteNode);
    }
    render(builder, _node, entering) {
        if (entering) {
            builder
                .nl()
                .tag(`blockquote`)
                .nl();
        }
        else {
            builder
                .nl()
                .tag(`/blockquote`)
                .nl();
        }
    }
}
exports.BlockquoteHtmlRenderer = BlockquoteHtmlRenderer;
//# sourceMappingURL=BlockquoteHtmlRenderer.js.map