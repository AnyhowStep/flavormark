import { InlineParser } from "../InlineParser";
import { InlineContentParser } from "../InlineContentParser";
import { Node } from "../Node";
import { BracketCollection } from "../refactored-misc/BracketCollection";
export declare class OpenBracketParser extends InlineParser {
    private brackets;
    constructor(brackets: BracketCollection);
    reinit(): void;
    parse(parser: InlineContentParser, block: Node): boolean;
}
