import { Node } from "../Node";
export declare class FencedCodeBlockNode extends Node {
    fenceLength: number;
    fenceChar: string;
    fenceOffset: number;
    info: string | undefined;
    string_content: string | undefined;
    literal: string | undefined;
}
