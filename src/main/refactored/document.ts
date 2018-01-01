import {BlockParser} from "./BlockParser";
import {BlockNode} from "./BlockNode";

export class DocumentParser extends BlockParser {
    continue= () => { return true; };
    finalize= () => { return; };
    canContain= (t:string) => { return (t !== 'item'); };
    acceptsLines = false;
}
export const documentParser = new DocumentParser("document", BlockNode);
