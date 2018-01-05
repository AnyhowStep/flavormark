import { Node } from "../Node";
import { InlineParser } from "../InlineParser";
import { BlockParser } from "../refactored/BlockParser";
import { Parser } from "../Parser";
export declare abstract class InParser {
    reinit(): void;
    abstract parse(parser: InlineParser, block: Node, blockParser: BlockParser, mainParserThing: Parser): boolean;
    finalize(): void;
}
