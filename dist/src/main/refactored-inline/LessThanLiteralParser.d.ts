import { InParser } from "./InParser";
import { InlineParser } from "../inlines";
import { Node } from "../node";
export declare class LessThanLiteralParser extends InParser {
    parse(parser: InlineParser, block: Node): boolean;
}
