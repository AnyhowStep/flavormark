import { InParser } from "./InParser";
import { InlineParser } from "../inlines";
import { BlockNode } from "../refactored/BlockNode";
import { DelimiterCollection } from "../refactored-misc/DelimiterCollection";
export declare class DelimParser extends InParser {
    private delimiters;
    private smart;
    constructor(delimiters: DelimiterCollection, smart?: boolean);
    reinit(): void;
    parse(parser: InlineParser, block: BlockNode): boolean;
}
