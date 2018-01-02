import {InlineNode} from "./InlineNode";

export class TextNode extends InlineNode {
    public constructor (str : string) {
        super("text");
        this.literal = str;
    }
}
