"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const HtmlTagNode_1 = require("../../../../commonmark/inline/node/HtmlTagNode");
const tag_filter_1 = require("../../../tag-filter");
class HtmlTagHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(HtmlTagNode_1.HtmlTagNode);
    }
    render(builder, node, entering) {
        if (entering) {
            builder.append(tag_filter_1.filterTag(node.literal));
        }
    }
}
exports.HtmlTagHtmlRenderer = HtmlTagHtmlRenderer;
//# sourceMappingURL=HtmlTagHtmlRenderer.js.map