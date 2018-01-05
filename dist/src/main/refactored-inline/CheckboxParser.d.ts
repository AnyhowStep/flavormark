import { InParser } from "./InParser";
import { InlineParser } from "../InlineParser";
import { Node } from "../Node";
import { BlockParser } from "../BlockParser";
import { Parser } from "../Parser";
export declare class CheckboxParser extends InParser {
    parse(parser: InlineParser, block: Node, blockParser: BlockParser, mainParserThing: Parser): boolean;
}
