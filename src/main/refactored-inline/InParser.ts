import {Node} from "../node";
import {InlineParser} from "../inlines";
import {BlockParser} from "../refactored/BlockParser";
import {Parser} from "../blocks";

//TODO rename to InlineParser or something
export abstract class InParser {
    public reinit () : void {}
    public abstract parse (parser : InlineParser, block : Node, blockParser : BlockParser, mainParserThing : Parser) : boolean;
    public finalize () : void {}
}
