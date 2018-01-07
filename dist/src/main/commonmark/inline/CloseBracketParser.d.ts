import { InlineParser } from "../../InlineParser";
import { InlineContentParser } from "../../InlineContentParser";
import { Node } from "../../Node";
import { RefMap } from "../../refactored-misc/RefMap";
import { BracketCollection } from "../../refactored-misc/BracketCollection";
import { DelimitedInlineParser } from "../../DelimitedInlineParser";
export declare class CloseBracketParser extends InlineParser {
    private delimParser;
    private brackets;
    private refMap;
    constructor(delimParser: DelimitedInlineParser, brackets: BracketCollection, refMap: RefMap);
    parse(parser: InlineContentParser, block: Node): boolean;
}
