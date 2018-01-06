import {Node} from "./Node";

export class TextNode extends Node {
    public literal : string|undefined = undefined;
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
