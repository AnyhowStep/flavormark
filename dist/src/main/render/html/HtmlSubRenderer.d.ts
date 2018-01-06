import { Node } from "../../Node";
import { HtmlBuilder } from "./HtmlBuilder";
export declare abstract class HtmlSubRenderer<NodeT extends Node> {
    readonly ctor: {
        new (...args: any[]): NodeT;
    };
    constructor(ctor: {
        new (...args: any[]): NodeT;
    });
    canRender<OtherT extends Node>(node: OtherT): this is HtmlSubRenderer<OtherT>;
    abstract render(builder: HtmlBuilder, node: NodeT, entering: boolean): void;
}
