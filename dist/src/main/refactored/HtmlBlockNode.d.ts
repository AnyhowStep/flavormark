import { Node } from "../node";
export declare class HtmlBlockNode extends Node {
    htmlBlockType: number;
    string_content: string | null;
    literal: string | null;
}