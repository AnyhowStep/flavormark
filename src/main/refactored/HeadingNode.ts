import {Node} from "../Node";

export class HeadingNode extends Node {
    public level : number = -1;
    public string_content : string|undefined = undefined;
}
