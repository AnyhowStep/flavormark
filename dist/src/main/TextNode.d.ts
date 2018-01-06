import { Node } from "./Node";
export declare class TextNode extends Node {
    literal: string | undefined;
    constructor(str: string);
    getString(): string;
    setString(str: string): void;
}
