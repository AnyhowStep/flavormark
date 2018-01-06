import { InlineParser } from "../InlineParser";
import { InlineContentParser } from "../InlineContentParser";
import { Node } from "../Node";
import { Delimiter, DelimiterCollection } from "../refactored-misc/DelimiterCollection";
import { DelimitedInlineSubParser } from "../DelimitedInlineSubParser";
export declare class DelimiterParser extends InlineParser {
    private delimiters;
    private parsers;
    constructor(delimiters: DelimiterCollection, parsers: DelimitedInlineSubParser[]);
    reinit(): void;
    parse(parser: InlineContentParser, block: Node): boolean;
    finalize(): void;
    scanDelims(parser: InlineContentParser, dil: DelimitedInlineSubParser, cc: number): {
        numdelims: number;
        can_open: boolean;
        can_close: boolean;
    } | null;
    processEmphasis(stack_bottom: Delimiter | null): void;
}
