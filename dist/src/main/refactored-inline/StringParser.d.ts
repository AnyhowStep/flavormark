import { InParser } from "./InParser";
import { InlineParser } from "../inlines";
import { Node } from "../node";
export declare class StringParser extends InParser {
    private smart;
    constructor(smart?: boolean);
    parse(parser: InlineParser, block: Node): boolean;
}
