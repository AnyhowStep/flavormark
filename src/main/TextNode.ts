import {Node} from "./Node";

//If you want your own custom text node,
//extend this class and pass its ctor to
//InlineContentParser
export class TextNode extends Node {
    public literal : string = "";
    public constructor (str : string) {
        super("text");
        this.literal = str;
    }
    public getString () {
        return this.literal;
    }
    public setString (str : string) {
        this.literal = str;
    }
}
