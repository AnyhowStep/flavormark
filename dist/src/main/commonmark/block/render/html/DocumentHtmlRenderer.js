"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const DocumentNode_1 = require("./../../node/DocumentNode");
class DocumentHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(DocumentNode_1.DocumentNode);
    }
    render(_builder, _node, _entering) {
    }
}
exports.DocumentHtmlRenderer = DocumentHtmlRenderer;
//# sourceMappingURL=DocumentHtmlRenderer.js.map