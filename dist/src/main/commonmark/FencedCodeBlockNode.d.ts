import { Node } from "../Node";
export declare class FencedCodeBlockNode extends Node {
    fenceLength: number;
    fenceChar: string;
    fenceOffset: number;
    info: string;
    stringContent: string;
    literal: string;
}
