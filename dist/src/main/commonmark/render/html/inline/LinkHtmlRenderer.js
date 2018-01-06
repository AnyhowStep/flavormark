"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("../../../../render/html/HtmlSubRenderer");
const LinkNode_1 = require("../../../inline/LinkNode");
const common_1 = require("../../../../common");
class LinkHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(LinkNode_1.LinkNode);
    }
    render(builder, node, entering) {
        if (entering) {
            const attrs = [];
            attrs.push(['href', common_1.escapeXml(node.destination, true)]);
            if (node.title) {
                attrs.push(['title', common_1.escapeXml(node.title, true)]);
            }
            builder.tag('a', attrs);
        }
        else {
            builder.tag('/a');
        }
    }
}
exports.LinkHtmlRenderer = LinkHtmlRenderer;
//# sourceMappingURL=LinkHtmlRenderer.js.map