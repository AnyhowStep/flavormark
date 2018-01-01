import {BlockNode} from "../refactored/BlockNode";
import {InlineParser} from "../inlines";

//TODO rename to InlineParser or something
export abstract class InParser {
    public abstract parse (parser : InlineParser, block : BlockNode) : boolean;
}
