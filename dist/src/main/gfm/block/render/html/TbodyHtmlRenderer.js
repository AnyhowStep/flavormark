"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const TbodyNode_1 = require("./../../node/TbodyNode");
class TbodyHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(TbodyNode_1.TbodyNode);
    }
    render(builder, _node, entering) {
        if (entering) {
            builder
                .nl()
                .tag(`tbody`)
                .nl();
        }
        else {
            builder
                .tag(`/tbody`);
        }
    }
}
exports.TbodyHtmlRenderer = TbodyHtmlRenderer;
//# sourceMappingURL=TbodyHtmlRenderer.js.map