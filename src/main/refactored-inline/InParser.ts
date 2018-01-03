import {Node} from "../node";
import {InlineParser} from "../inlines";

//TODO rename to InlineParser or something
export abstract class InParser {
    public reinit () : void {}
    public abstract parse (parser : InlineParser, block : Node) : boolean;
    public finalize () : void {}
}
