import { InParser } from "./InParser";
import { InlineParser } from "../inlines";
import { Node } from "../node";
import { DelimiterCollection } from "../refactored-misc/DelimiterCollection";
export declare class DelimParser extends InParser {
    private delimiters;
    private smart;
    constructor(delimiters: DelimiterCollection, smart?: boolean);
    reinit(): void;
    parse(parser: InlineParser, block: Node): boolean;
}
