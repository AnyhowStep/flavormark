import { InParser } from "./InParser";
import { InlineContentParser } from "../InlineContentParser";
import { Node } from "../Node";
export declare class EntityParser extends InParser {
    parse(parser: InlineContentParser, block: Node): boolean;
}
