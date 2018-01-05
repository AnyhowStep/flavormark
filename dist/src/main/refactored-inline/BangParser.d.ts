import { InParser } from "../InParser";
import { InlineContentParser } from "../InlineContentParser";
import { Node } from "../Node";
import { BracketCollection } from "../refactored-misc/BracketCollection";
export declare class BangParser extends InParser {
    private brackets;
    constructor(brackets: BracketCollection);
    parse(parser: InlineContentParser, block: Node): boolean;
}
