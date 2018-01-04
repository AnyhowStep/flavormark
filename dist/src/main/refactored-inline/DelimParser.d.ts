import { InParser } from "./InParser";
import { InlineParser } from "../inlines";
import { Node } from "../node";
import { Delimiter, DelimiterCollection } from "../refactored-misc/DelimiterCollection";
export declare class DelimParser extends InParser {
    private delimiters;
    private smart;
    constructor(delimiters: DelimiterCollection, smart?: boolean);
    reinit(): void;
    parse(parser: InlineParser, block: Node): boolean;
    finalize(): void;
    processEmphasis(stack_bottom: Delimiter | null): void;
    scanDelims(parser: InlineParser, cc: number): {
        numdelims: number;
        can_open: boolean;
        can_close: boolean;
    } | null;
}
