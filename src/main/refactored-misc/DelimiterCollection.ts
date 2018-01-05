//import {Node} from "../Node";
import {TextNode} from "../TextNode";

export interface Delimiter {
    cc: number,
    numdelims: number,
    origdelims: number,
    node: TextNode,
    previous: Delimiter|null,
    next: Delimiter|null,
    can_open: boolean,
    can_close: boolean
}

export interface PushArgs {
    cc: number,
    numdelims: number,
    origdelims: number,
    node: TextNode,
    can_open: boolean,
    can_close: boolean
}

export class DelimiterCollection {
    private top : Delimiter|null = null;  // used by handleDelim method
    public clear () {
        this.top = null;
    }
    remove(delim : Delimiter|null) {
        if (!delim) {
            return;
        }
        if (delim.previous !== null) {
            delim.previous.next = delim.next;
        }
        if (delim.next === null) {
            // top of stack
            this.top = delim.previous;
        } else {
            delim.next.previous = delim.previous;
        }
    };
    public peek () {
        return this.top;
    }
    public push (args : PushArgs) {
        this.top = {
            ...args,
            previous: this.top,
            next: null,
        };
        if (this.top.previous !== null) {
            this.top.previous.next = this.top;
        }
        return this.top;
    }
}

export function removeDelimitersBetween(bottom : Delimiter|null, top : Delimiter) {
    if (bottom && bottom.next !== top) {
        bottom.next = top;
        top.previous = bottom;
    }
};
