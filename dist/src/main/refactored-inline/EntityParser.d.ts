import { InParser } from "./InParser";
import { InlineParser } from "../InlineParser";
import { Node } from "../Node";
export declare class EntityParser extends InParser {
    parse(parser: InlineParser, block: Node): boolean;
}
