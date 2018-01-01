import {BlockParser} from "./BlockParser";

export class DocumentParser extends BlockParser {
    continue= () => { return true; };
    finalize= () => { return; };
    canContain= (t:string) => { return (t !== 'item'); };
    acceptsLines = false;
}
export const documentParser = new DocumentParser();
