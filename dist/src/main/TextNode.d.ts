import { Node, Range } from "./Node";
export declare class TextNode extends Node {
    literal: string;
    constructor(strOrRange: string | Range);
    getString(): string;
    setString(str: string): void;
}
