import { InParser } from "./InParser";
import { InlineParser } from "../InlineParser";
import { Node } from "../Node";
import { BracketCollection } from "../refactored-misc/BracketCollection";
export declare class OpenBracketParser extends InParser {
    private brackets;
    constructor(brackets: BracketCollection);
    reinit(): void;
    parse(parser: InlineParser, block: Node): boolean;
}
