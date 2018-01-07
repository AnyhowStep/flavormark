import { BlockParser } from "./../../../BlockParser";
import { Node } from "./../../../Node";
import { Parser } from "./../../../Parser";
export declare abstract class ParagraphContentParser {
    abstract reinit(): void;
    abstract parse(paragraphParser: BlockParser<Node>, paragraph: Node, mainParser: Parser): boolean;
}
