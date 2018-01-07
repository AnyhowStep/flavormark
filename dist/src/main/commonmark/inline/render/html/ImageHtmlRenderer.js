"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const ImageNode_1 = require("./../../node/ImageNode");
const common_1 = require("./../../../common");
class ImageHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(ImageNode_1.ImageNode);
    }
    render(builder, node, entering) {
        if (entering) {
            if (builder.tagsAllowed()) {
                builder.append('<img src="', common_1.escapeXml(node.destination, true), '" alt="');
            }
            builder.addDisableTag();
        }
        else {
            builder.removeDisableTag();
            if (builder.tagsAllowed()) {
                if (node.title) {
                    builder.append('" title="', common_1.escapeXml(node.title, true));
                }
                builder.append('" />');
            }
        }
    }
}
exports.ImageHtmlRenderer = ImageHtmlRenderer;
//# sourceMappingURL=ImageHtmlRenderer.js.map