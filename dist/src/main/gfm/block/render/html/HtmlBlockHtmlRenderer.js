"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const HtmlBlockNode_1 = require("../../../../commonmark/block/node/HtmlBlockNode");
const tag_filter_1 = require("../../../tag-filter");
class HtmlBlockHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(HtmlBlockNode_1.HtmlBlockNode);
    }
    render(builder, node, entering) {
        if (entering) {
            builder
                .nl()
                .append(tag_filter_1.filterTag(node.literal))
                .nl();
        }
    }
}
exports.HtmlBlockHtmlRenderer = HtmlBlockHtmlRenderer;
//# sourceMappingURL=HtmlBlockHtmlRenderer.js.map