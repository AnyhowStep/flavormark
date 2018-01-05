import { Node } from "../node";
export declare class LatexBlockNode extends Node {
    fenceLength: number;
    fenceChar: string;
    fenceOffset: number;
    oneLine: boolean;
    string_content: string | null;
    literal: string | null;
}
