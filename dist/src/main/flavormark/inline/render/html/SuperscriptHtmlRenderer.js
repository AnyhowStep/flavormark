"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const SuperscriptNode_1 = require("./../../node/SuperscriptNode");
class SuperscriptHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(SuperscriptNode_1.SuperscriptNode);
    }
    render(builder, _node, entering) {
        builder.tag(entering ? "sup" : "/sup");
    }
}
exports.SuperscriptHtmlRenderer = SuperscriptHtmlRenderer;
//# sourceMappingURL=SuperscriptHtmlRenderer.js.map