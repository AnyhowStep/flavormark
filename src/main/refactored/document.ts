import {BlockParser, BlockParserMeta} from "../BlockParser";
import {Node} from "../Node";

export class DocumentParser extends BlockParser {
    continue= () => { return true; };
    finalize= () => { return; };
    canContain= (blockParser : BlockParserMeta) =>{ return blockParser.isListItem != true; };
    acceptsLines = false;
}
export const documentParser = new DocumentParser("document", Node);
