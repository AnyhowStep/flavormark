import {Node} from "../node";

export class HeadingNode extends Node {
    public level : number = -1;
    public string_content : string|null = null;
}
