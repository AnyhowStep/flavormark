import { InlineParser } from "./InlineParser";
import { InlineContentParser } from "./InlineContentParser";
import { Node } from "./Node";
import { Delimiter, DelimiterCollection } from "./DelimiterCollection";
import { DelimitedInlineSubParser } from "./DelimitedInlineSubParser";
export declare class DelimitedInlineParser extends InlineParser {
    private delimiters;
    private parsers;
    constructor(delimiters: DelimiterCollection, parsers: DelimitedInlineSubParser[]);
    reinit(): void;
    parse(parser: InlineContentParser, node: Node): boolean;
    finalize(): void;
    scanDelims(parser: InlineContentParser, dil: DelimitedInlineSubParser, cc: string): {
        numdelims: number;
        can_open: boolean;
        can_close: boolean;
    } | undefined;
    processEmphasis(stack_bottom: Delimiter | undefined): void;
}
