import { ParagraphContentParser } from "./ParagraphContentParser";
import { BlockParser } from "./../../../BlockParser";
import { Node } from "./../../../Node";
import { RefMap } from "./../../RefMap";
export declare class LinkReferenceDefinitionParser extends ParagraphContentParser {
    private refMap;
    constructor(refMap: RefMap);
    reinit(): void;
    parse(paragraphParser: BlockParser<Node>, paragraph: Node): boolean;
}
