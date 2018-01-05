import {Node} from "../Node";

export class FencedCodeBlockNode extends Node {
    public fenceLength : number = -1;
    public fenceChar   : string = "";
    public fenceOffset : number = -1;
    public info : string|null = null;
    public string_content : string|null = null;
    public literal : string|null = null;
}
