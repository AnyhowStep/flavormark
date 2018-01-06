import {Node} from "../Node";

export class HtmlBlockNode extends Node {
    htmlBlockType : number = -1;
    public string_content : string|undefined = undefined;
    public literal : string|undefined = undefined;
}
