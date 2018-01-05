import { InParser } from "./InParser";
import { InlineParser } from "../InlineParser";
import { Node } from "../node";
export declare class InlineLatexParser extends InParser {
    parse(parser: InlineParser, block: Node): boolean;
}
