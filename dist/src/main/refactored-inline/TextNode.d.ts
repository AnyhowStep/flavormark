import { Node } from "../node";
export declare class TextNode extends Node {
    constructor(str: string);
    getString(): string;
    setString(str: string): void;
}
