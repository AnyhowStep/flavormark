import {Node} from "../../Node";
import {HtmlAsyncSubRenderer} from "./HtmlAsyncSubRenderer";
import {HtmlSubRenderer} from "./HtmlSubRenderer";
import {HtmlBuilder} from "./HtmlBuilder";

export class HtmlRenderer {
    public subRenderers : HtmlAsyncSubRenderer<Node>[];
    public constructor (subRenderers : HtmlAsyncSubRenderer<Node>[]) {
        this.subRenderers = subRenderers;
    }
    public getSubRenderer<NodeT extends Node> (node : NodeT) : HtmlAsyncSubRenderer<NodeT> {
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
            const subRenderer = <HtmlSubRenderer<Node>>this.getSubRenderer(event.node);
            subRenderer.render(b, event.node, event.entering);
        }
        return b.toString();
    }
    public async renderAsync (node : Node) : Promise<string> {
        const b = new HtmlBuilder();
        const w = node.walker();
        for (let event = w.next(); event != undefined; event = w.next()) {
            const subRenderer = this.getSubRenderer(event.node);
            await subRenderer.renderAsync(b, event.node, event.entering);
        }
        return b.toString();
    }
}
