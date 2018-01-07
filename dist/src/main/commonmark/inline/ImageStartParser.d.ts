import { InlineParser } from "../../InlineParser";
import { InlineContentParser } from "../../InlineContentParser";
import { Node } from "../../Node";
import { BracketCollection } from "../../refactored-misc/BracketCollection";
export declare class ImageStartParser extends InlineParser {
    private brackets;
    constructor(brackets: BracketCollection);
    parse(parser: InlineContentParser, node: Node): boolean;
}
