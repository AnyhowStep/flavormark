import { Node } from "./../../../Node";
import { DelimiterCollection, Delimiter } from "./../../../DelimiterCollection";
export interface Bracket {
    node: Node;
    previous: Bracket | undefined;
    previousDelimiter: Delimiter | undefined;
    index: number;
    image: boolean;
    active: boolean;
    bracketAfter?: boolean;
}
export declare class BracketCollection {
    private delimiters;
    private top;
    constructor(delimiters: DelimiterCollection);
    clear(): void;
    push(node: Node, index: number, image: boolean): void;
    pop(): void;
    peek(): Bracket | undefined;
}
