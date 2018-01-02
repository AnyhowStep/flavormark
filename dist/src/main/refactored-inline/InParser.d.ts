import { BlockNode } from "../refactored/BlockNode";
import { InlineParser } from "../inlines";
export declare abstract class InParser {
    reinit(): void;
    abstract parse(parser: InlineParser, block: BlockNode): boolean;
    finalize(): void;
}
