import {Node} from "../../Node";
import {HtmlBuilder} from "./HtmlBuilder";
import {HtmlAsyncSubRenderer} from "./HtmlAsyncSubRenderer";

export abstract class HtmlSubRenderer<NodeT extends Node> extends HtmlAsyncSubRenderer<NodeT> {
    public constructor (ctor : {new(...args : any[]):NodeT}) {
        super(ctor);
    }
    public async renderAsync (builder : HtmlBuilder, node : NodeT, entering : boolean) : Promise<void> {
        await this.render(builder, node, entering);
    }
    public abstract render (builder : HtmlBuilder, node : NodeT, entering : boolean) : void;
}
