"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlSubRenderer_1 = require("./../../../../render/html/HtmlSubRenderer");
const TableNode_1 = require("./../../node/TableNode");
class TableHtmlRenderer extends HtmlSubRenderer_1.HtmlSubRenderer {
    constructor() {
        super(TableNode_1.TableNode);
    }
    render(builder, _node, entering) {
        if (entering) {
            builder
                .tag(`table`)
                .nl();
        }
        else {
            builder
                .tag(`/table`)
                .nl();
        }
    }
}
exports.TableHtmlRenderer = TableHtmlRenderer;
//# sourceMappingURL=TableHtmlRenderer.js.map