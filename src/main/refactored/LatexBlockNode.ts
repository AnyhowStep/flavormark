import {Node} from "../Node";

export class LatexBlockNode extends Node {
    public fenceLength : number = -1;
    public fenceChar   : string = "";
    public fenceOffset : number = -1;
    public oneLine : boolean = false;
    public string_content : string|undefined = undefined;
    public literal : string|undefined = undefined;
}
