import { InlineNode } from "./InlineNode";
export declare class TextNode extends InlineNode {
    constructor(str: string);
    getString(): string;
    setString(str: string): void;
}
