import {Node} from "../node";

export class IndentedCodeBlockNode extends Node {
    public string_content : string|null = null;
    public literal : string|null = null;
}
