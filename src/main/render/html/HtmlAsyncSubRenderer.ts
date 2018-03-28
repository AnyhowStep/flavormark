import {Node} from "../../Node";
import {HtmlBuilder} from "./HtmlBuilder";

export abstract class HtmlAsyncSubRenderer<NodeT extends Node> {
    public readonly ctor : {new(...args : any[]):NodeT};
    public constructor (ctor : {new(...args : any[]):NodeT}) {
        this.ctor = ctor;
    }
    public canRender<OtherT extends Node> (node : OtherT) : this is HtmlAsyncSubRenderer<OtherT> {
        return node instanceof this.ctor;
    }
    public abstract async renderAsync (builder : HtmlBuilder, node : NodeT, entering : boolean) : Promise<void>;
}
