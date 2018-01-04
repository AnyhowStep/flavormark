import { InParser } from "./InParser";
import { InlineParser } from "../inlines";
import { Node } from "../node";
import { BlockParser } from "../refactored/BlockParser";
import { Parser } from "../blocks";
export declare class CheckboxParser extends InParser {
    parse(parser: InlineParser, block: Node, blockParser: BlockParser, mainParserThing: Parser): boolean;
}
