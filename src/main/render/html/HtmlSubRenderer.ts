import {Node} from "../../Node";
import {HtmlBuilder} from "./HtmlBuilder";

export abstract class HtmlSubRenderer<NodeT extends Node> {
    public readonly ctor : {new(...args : any[]):NodeT};
    public constructor (ctor : {new(...args : any[]):NodeT}) {
        this.ctor = ctor;
    }
    public canRender<OtherT extends Node> (node : OtherT) : this is HtmlSubRenderer<OtherT> {
        return node instanceof this.ctor;
    }
    public abstract render (builder : HtmlBuilder, node : NodeT, entering : boolean) : void;
}
