import {Node} from "../node";

export class TextNode extends Node {
    public literal : string|null = null;
    public constructor (str : string) {
        super("text");
        this.literal = str;
    }
    public getString () {
        return this.literal || "";
    }
    public setString (str : string) {
        this.literal = str;
    }
}
