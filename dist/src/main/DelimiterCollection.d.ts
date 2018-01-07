import { TextNode } from "./TextNode";
export interface Delimiter {
    cc: string;
    numdelims: number;
    origdelims: number;
    node: TextNode;
    previous: Delimiter | undefined;
    next: Delimiter | undefined;
    can_open: boolean;
    can_close: boolean;
}
export interface PushArgs {
    cc: string;
    numdelims: number;
    origdelims: number;
    node: TextNode;
    can_open: boolean;
    can_close: boolean;
}
export declare class DelimiterCollection {
    private top;
    clear(): void;
    remove(delim: Delimiter | undefined): void;
    peek(): Delimiter | undefined;
    push(args: PushArgs): Delimiter;
}
export declare function removeDelimitersBetween(bottom: Delimiter | undefined, top: Delimiter): void;
