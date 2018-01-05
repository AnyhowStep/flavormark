import {Node} from "./Node";
import {InlineContentParser} from "./InlineContentParser";
import {BlockParser} from "./BlockParser";
import {Parser} from "./Parser";

export abstract class InlineParser {
    public reinit () : void {}
    public abstract parse (parser : InlineContentParser, block : Node, blockParser : BlockParser, mainParserThing : Parser) : boolean;
    public finalize () : void {}
}
