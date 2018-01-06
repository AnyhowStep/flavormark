import { Node } from "../../Node";
import { HtmlSubRenderer } from "./HtmlSubRenderer";
export declare class HtmlRenderer {
    subRenderers: HtmlSubRenderer<Node>[];
    constructor(subRenderers: HtmlSubRenderer<Node>[]);
    getSubRenderer<NodeT extends Node>(node: NodeT): HtmlSubRenderer<NodeT>;
    render(node: Node): string;
}
