import { Node } from "./Node";
export declare class TextNode extends Node {
    literal: string;
    constructor(str: string);
    getString(): string;
    setString(str: string): void;
}
