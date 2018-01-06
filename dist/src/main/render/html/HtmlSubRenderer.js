"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HtmlSubRenderer {
    constructor(ctor) {
        this.ctor = ctor;
    }
    canRender(node) {
        return node instanceof this.ctor;
    }
}
exports.HtmlSubRenderer = HtmlSubRenderer;
//# sourceMappingURL=HtmlSubRenderer.js.map