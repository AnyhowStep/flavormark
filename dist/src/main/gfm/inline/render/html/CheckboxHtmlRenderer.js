"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const CheckboxNode_1 = require("./../../node/CheckboxNode");
class CheckboxHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(CheckboxNode_1.CheckboxNode);
    }
    render(builder, node, entering) {
        if (entering) {
            builder.append(`<input `);
            if (node.checked) {
                builder.append(`checked="" `);
            }
            builder.append(`disabled="" type="checkbox">`);
        }
    }
}
exports.CheckboxHtmlRenderer = CheckboxHtmlRenderer;
//# sourceMappingURL=CheckboxHtmlRenderer.js.map