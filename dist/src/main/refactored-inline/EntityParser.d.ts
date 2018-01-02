import { InParser } from "./InParser";
import { InlineParser } from "../inlines";
import { BlockNode } from "../refactored/BlockNode";
export declare class EntityParser extends InParser {
    parse(parser: InlineParser, block: BlockNode): boolean;
}
