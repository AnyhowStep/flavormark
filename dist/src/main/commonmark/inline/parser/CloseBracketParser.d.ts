import { InlineParser } from "./../../../InlineParser";
import { InlineContentParser } from "./../../../InlineContentParser";
import { Node } from "./../../../Node";
import { RefMap } from "./../../RefMap";
import { BracketCollection } from "./BracketCollection";
import { DelimitedInlineParser } from "./../../../DelimitedInlineParser";
export declare class CloseBracketParser extends InlineParser {
    private delimParser;
    private brackets;
    private refMap;
    constructor(delimParser: DelimitedInlineParser, brackets: BracketCollection, refMap: RefMap);
    parse(parser: InlineContentParser, node: Node): boolean;
}
