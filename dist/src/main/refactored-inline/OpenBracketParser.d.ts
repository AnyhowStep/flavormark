import { InParser } from "../InParser";
import { InlineContentParser } from "../InlineContentParser";
import { Node } from "../Node";
import { BracketCollection } from "../refactored-misc/BracketCollection";
export declare class OpenBracketParser extends InParser {
    private brackets;
    constructor(brackets: BracketCollection);
    reinit(): void;
    parse(parser: InlineContentParser, block: Node): boolean;
}
