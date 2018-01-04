import { Node } from "../node";
import { InlineParser } from "../inlines";
import { BlockParser } from "../refactored/BlockParser";
import { Parser } from "../blocks";
export declare abstract class InParser {
    reinit(): void;
    abstract parse(parser: InlineParser, block: Node, blockParser: BlockParser, mainParserThing: Parser): boolean;
    finalize(): void;
}
