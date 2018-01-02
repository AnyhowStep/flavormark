import {BlockParser, BlockParserMeta} from "./BlockParser";
import {BlockNode} from "./BlockNode";

export class DocumentParser extends BlockParser {
    continue= () => { return true; };
    finalize= () => { return; };
    canContain= (blockParser : BlockParserMeta) =>{ return blockParser.isListItem != true; };
    acceptsLines = false;
}
export const documentParser = new DocumentParser("document", BlockNode);
