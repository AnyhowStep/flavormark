import { Node } from "../node";
import { InlineParser } from "../inlines";
export declare abstract class InParser {
    reinit(): void;
    abstract parse(parser: InlineParser, block: Node): boolean;
    finalize(): void;
}
