import { Node } from "../Node";
export declare class LatexBlockNode extends Node {
    fenceLength: number;
    fenceChar: string;
    fenceOffset: number;
    oneLine: boolean;
    string_content: string | undefined;
    literal: string | undefined;
}
