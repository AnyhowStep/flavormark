import { InlineParser } from "./../../../InlineParser";
import { InlineContentParser } from "./../../../InlineContentParser";
import { Node } from "./../../../Node";
export declare class ExtendedEmailAutolinkParser extends InlineParser {
    parse(parser: InlineContentParser, node: Node): boolean;
}
