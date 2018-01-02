import { InParser } from "./InParser";
import { InlineParser } from "../inlines";
import { BlockNode } from "../refactored/BlockNode";
import { BracketCollection } from "../refactored-misc/BracketCollection";
export declare class BangParser extends InParser {
    private brackets;
    constructor(brackets: BracketCollection);
    parse(parser: InlineParser, block: BlockNode): boolean;
}
