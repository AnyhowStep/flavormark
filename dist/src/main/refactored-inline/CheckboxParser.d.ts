import { InParser } from "./InParser";
import { InlineContentParser } from "../InlineContentParser";
import { Node } from "../Node";
import { BlockParser } from "../BlockParser";
import { Parser } from "../Parser";
export declare class CheckboxParser extends InParser {
    parse(parser: InlineContentParser, block: Node, blockParser: BlockParser, mainParserThing: Parser): boolean;
}
