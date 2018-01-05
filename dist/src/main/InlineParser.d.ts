import { Node } from "./Node";
import { InlineContentParser } from "./InlineContentParser";
import { BlockParser } from "./BlockParser";
import { Parser } from "./Parser";
export declare abstract class InlineParser {
    reinit(): void;
    abstract parse(parser: InlineContentParser, block: Node, blockParser: BlockParser, mainParserThing: Parser): boolean;
    finalize(): void;
}
