import { Node } from "../node";
export declare class FencedCodeBlockNode extends Node {
    fenceLength: number;
    fenceChar: string;
    fenceOffset: number;
    info: string | null;
    string_content: string | null;
    literal: string | null;
}
