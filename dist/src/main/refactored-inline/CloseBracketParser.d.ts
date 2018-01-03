import { InParser } from "./InParser";
import { InlineParser } from "../inlines";
import { Node } from "../node";
import { RefMap } from "../refactored-misc/RefMap";
import { DelimiterCollection } from "../refactored-misc/DelimiterCollection";
import { BracketCollection } from "../refactored-misc/BracketCollection";
export declare class CloseBracketParser extends InParser {
    private delimiters;
    private brackets;
    private refMap;
    constructor(delimiters: DelimiterCollection, brackets: BracketCollection, refMap: RefMap);
    parse(parser: InlineParser, block: Node): boolean;
}
