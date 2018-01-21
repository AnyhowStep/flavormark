import { Node } from "./Node";
import { InlineContentParser } from "./InlineContentParser";
import { BlockParser } from "./BlockParser";
import { Parser } from "./Parser";
export declare abstract class InlineParser {
    reinitForDocument(): void;
    reinit(): void;
    abstract parse(inlineContentParser: InlineContentParser, node: Node, blockParser: BlockParser, mainParser: Parser): boolean;
    finalize(): void;
}
