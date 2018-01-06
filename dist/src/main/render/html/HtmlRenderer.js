"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlBuilder_1 = require("./HtmlBuilder");
class HtmlRenderer {
    constructor(subRenderers) {
        this.subRenderers = subRenderers;
    }
    getSubRenderer(node) {
        for (let sub of this.subRenderers) {
            if (sub.canRender(node)) {
                return sub;
            }
        }
        throw new Error(`No sub renderer for ${Object.getPrototypeOf(node).constructor.name}`);
    }
    render(node) {
        const b = new HtmlBuilder_1.HtmlBuilder();
        const w = node.walker();
        for (let event = w.next(); event != undefined; event = w.next()) {
            const subRenderer = this.getSubRenderer(event.node);
            subRenderer.render(b, event.node, event.entering);
        }
        return b.toString();
    }
}
exports.HtmlRenderer = HtmlRenderer;
//# sourceMappingURL=HtmlRenderer.js.map