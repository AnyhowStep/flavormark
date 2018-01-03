import { Node } from "../node";
export declare class TextNode extends Node {
    literal: string | null;
    constructor(str: string);
    getString(): string;
    setString(str: string): void;
}
