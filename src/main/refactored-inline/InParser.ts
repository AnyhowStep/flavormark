import {Node} from "../Node";
import {InlineParser} from "../InlineParser";
import {BlockParser} from "../BlockParser";
import {Parser} from "../Parser";

//TODO rename to InlineParser or something
export abstract class InParser {
    public reinit () : void {}
    public abstract parse (parser : InlineParser, block : Node, blockParser : BlockParser, mainParserThing : Parser) : boolean;
    public finalize () : void {}
}
