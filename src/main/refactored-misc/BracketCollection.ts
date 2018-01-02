import {Node} from "../node";
import {DelimiterCollection, Delimiter} from "./DelimiterCollection";

export interface Bracket {
    node: Node,
    previous: Bracket|null,
    previousDelimiter: Delimiter|null,
    index: number,
    image: boolean,
    active: boolean,
    bracketAfter? : boolean
}
export class BracketCollection {
    private delimiters : DelimiterCollection;
    private top : Bracket|null = null;
    public constructor (delimiters : DelimiterCollection) {
        this.delimiters = delimiters;
    }

    public push (node : Node, index : number, image : boolean) {
        if (this.top != null) {
            this.top.bracketAfter = true;
        }
        this.top = {
            node: node,
            previous: this.top,
            previousDelimiter: this.delimiters.peek(),
            index: index,
            image: image,
            active: true
        };
    }
    public pop () {
        if (this.top == null) {
            throw new Error("Removed more than we added");
        }
        this.top = this.top.previous;
    }
    public peek () {
        return this.top;
    }
}
