import {Node} from "../Node";

export class IndentedCodeBlockNode extends Node {
    public string_content : string|null = null;
    public literal : string|null = null;
}
