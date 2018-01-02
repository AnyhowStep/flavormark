import { InParser } from "./InParser";
import { InlineParser } from "../inlines";
import { BlockNode } from "../refactored/BlockNode";
export declare class StringParser extends InParser {
    private smart;
    constructor(smart?: boolean);
    parse(parser: InlineParser, block: BlockNode): boolean;
}
