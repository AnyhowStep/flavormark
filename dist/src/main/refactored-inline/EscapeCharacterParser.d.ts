import { InlineParser } from "../InlineParser";
import { InlineContentParser } from "../InlineContentParser";
import { Node } from "../Node";
export declare class EscapeCharacterParser extends InlineParser {
    parse(parser: InlineContentParser, block: Node): boolean;
}
