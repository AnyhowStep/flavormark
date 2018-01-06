import {BlockParser} from "../BlockParser";
import {Node} from "../Node";

export class DocumentParser extends BlockParser {
    continue () { return true; }
    finalize () {}
    canContain () { return true; }
    acceptsLines = false;
}
export const documentParser = new DocumentParser("document", Node);
