import { InParser } from "../InParser";
import { InlineContentParser } from "../InlineContentParser";
import { Node } from "../Node";
import { Delimiter, DelimiterCollection } from "../refactored-misc/DelimiterCollection";
import { DelimitedInlineParser } from "./DelimitedInlineParser";
export declare class DelimiterParser extends InParser {
    private delimiters;
    private parsers;
    constructor(delimiters: DelimiterCollection, parsers: DelimitedInlineParser[]);
    reinit(): void;
    parse(parser: InlineContentParser, block: Node): boolean;
    finalize(): void;
    scanDelims(parser: InlineContentParser, dil: DelimitedInlineParser, cc: number): {
        numdelims: number;
        can_open: boolean;
        can_close: boolean;
    } | null;
    processEmphasis(stack_bottom: Delimiter | null): void;
}
