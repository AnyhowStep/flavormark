import {Node} from "./Node";
import {InlineContentParser} from "./InlineContentParser";
import {BlockParser} from "./BlockParser";
import {Parser} from "./Parser";

//TODO rename to InlineContentParser or something
export abstract class InParser {
    public reinit () : void {}
    public abstract parse (parser : InlineContentParser, block : Node, blockParser : BlockParser, mainParserThing : Parser) : boolean;
    public finalize () : void {}
}
