import { InParser } from "./InParser";
import { InlineContentParser } from "../InlineContentParser";
import { Node } from "../Node";
export declare class ExtendedWwwAutolinkParser extends InParser {
    parse(parser: InlineContentParser, block: Node): boolean;
}
