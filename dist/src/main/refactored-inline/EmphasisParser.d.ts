import { InParser } from "./InParser";
import { InlineParser } from "../inlines";
import { Node } from "../node";
import { DelimiterCollection } from "../refactored-misc/DelimiterCollection";
export declare class EmphasisParser extends InParser {
    private delimiters;
    constructor(delimiters: DelimiterCollection);
    parse(_parser: InlineParser, _block: Node): boolean;
    finalize(): void;
}
