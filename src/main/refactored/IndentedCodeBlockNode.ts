import {Node} from "../Node";

export class IndentedCodeBlockNode extends Node {
    public string_content : string|undefined = undefined;
    public literal : string|undefined = undefined;
}
