import { BlockNode } from "./BlockNode";
export declare class FencedCodeBlockNode extends BlockNode {
    fenceLength: number;
    fenceChar: string;
    fenceOffset: number;
    string_content: string | null;
}
