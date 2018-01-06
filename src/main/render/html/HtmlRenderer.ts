import {Node} from "../../Node";
import {HtmlSubRenderer} from "./HtmlSubRenderer";
import {HtmlBuilder} from "./HtmlBuilder";

export class HtmlRenderer {
    public subRenderers : HtmlSubRenderer<Node>[];
    public constructor (subRenderers : HtmlSubRenderer<Node>[]) {
        this.subRenderers = subRenderers;
    }
    public getSubRenderer<NodeT extends Node> (node : NodeT) : HtmlSubRenderer<NodeT> {
        for (let sub of this.subRenderers) {
            if (sub.canRender(node)) {
                return sub;
            }
        }
        throw new Error(`No sub renderer for ${Object.getPrototypeOf(node).constructor.name}`);
    }
    public render (node : Node) : string {
        const b = new HtmlBuilder();
        const w = node.walker();
        for (let event = w.next(); event != undefined; event = w.next()) {
            const subRenderer = this.getSubRenderer(event.node);
            subRenderer.render(b, event.node, event.entering);
        }
        return b.toString();
    }
}
