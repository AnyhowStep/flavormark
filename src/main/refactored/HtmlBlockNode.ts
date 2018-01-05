import {Node} from "../Node";

export class HtmlBlockNode extends Node {
    htmlBlockType : number = -1;
    public string_content : string|null = null;
    public literal : string|null = null;
}
