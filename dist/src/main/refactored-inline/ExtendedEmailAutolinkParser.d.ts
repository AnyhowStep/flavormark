import { InParser } from "./InParser";
import { InlineParser } from "../inlines";
import { Node } from "../node";
export declare class ExtendedEmailAutolinkParser extends InParser {
    parse(parser: InlineParser, block: Node): boolean;
}