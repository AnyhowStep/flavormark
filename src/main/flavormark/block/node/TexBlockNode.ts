import {Node} from "./../../../Node";

export class TexBlockNode extends Node {
    public fenceLength : number = -1;
    public fenceChar   : string = "";
    public fenceOffset : number = -1;
    public oneLine : boolean = false;
    public stringContent : string = "";
    public literal : string = "";
}
