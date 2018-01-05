import { InParser } from "./InParser";
import { InlineContentParser } from "../InlineContentParser";
import { Node } from "../Node";
import { RefMap } from "../refactored-misc/RefMap";
import { BracketCollection } from "../refactored-misc/BracketCollection";
import { DelimiterParser } from "../refactored-delimiter/DelimiterParser";
export declare class CloseBracketParser extends InParser {
    private delimParser;
    private brackets;
    private refMap;
    constructor(delimParser: DelimiterParser, brackets: BracketCollection, refMap: RefMap);
    parse(parser: InlineContentParser, block: Node): boolean;
}
