import {BlockNode} from "../refactored/BlockNode";
import {InlineParser} from "../inlines";

//TODO rename to InlineParser or something
export abstract class InParser {
    public reinit () : void {}
    public abstract parse (parser : InlineParser, block : BlockNode) : boolean;
    public finalize () : void {}
}
