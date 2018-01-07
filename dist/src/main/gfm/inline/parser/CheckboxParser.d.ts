import { InlineParser } from "./../../../InlineParser";
import { InlineContentParser } from "./../../../InlineContentParser";
import { Node } from "./../../../Node";
import { BlockParser } from "./../../../BlockParser";
import { Parser } from "./../../../Parser";
export declare class CheckboxParser extends InlineParser {
    parse(inlineContentParser: InlineContentParser, node: Node, blockParser: BlockParser, parser: Parser): boolean;
}
