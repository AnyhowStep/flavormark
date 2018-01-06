import { Node } from "../Node";
export declare class HtmlBlockNode extends Node {
    htmlBlockType: number;
    string_content: string | undefined;
    literal: string | undefined;
}
