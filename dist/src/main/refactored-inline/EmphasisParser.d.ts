import { InParser } from "./InParser";
import { InlineParser } from "../inlines";
import { BlockNode } from "../refactored/BlockNode";
import { DelimiterCollection } from "../refactored-misc/DelimiterCollection";
export declare class EmphasisParser extends InParser {
    private delimiters;
    constructor(delimiters: DelimiterCollection);
    parse(_parser: InlineParser, _block: BlockNode): boolean;
    finalize(): void;
}
