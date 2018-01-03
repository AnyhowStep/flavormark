import { TextNode } from "../refactored-inline/TextNode";
export interface Delimiter {
    cc: number;
    numdelims: number;
    origdelims: number;
    node: TextNode;
    previous: Delimiter | null;
    next: Delimiter | null;
    can_open: boolean;
    can_close: boolean;
}
export interface PushArgs {
    cc: number;
    numdelims: number;
    origdelims: number;
    node: TextNode;
    can_open: boolean;
    can_close: boolean;
}
export declare class DelimiterCollection {
    private top;
    clear(): void;
    remove(delim: Delimiter | null): void;
    peek(): Delimiter | null;
    push(args: PushArgs): Delimiter;
}
export declare function removeDelimitersBetween(bottom: Delimiter | null, top: Delimiter): void;
