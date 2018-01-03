import {BlockNode} from "./BlockNode";

export class HtmlBlockNode extends BlockNode {
    htmlBlockType : number = -1;
    public string_content : string|null = null;
}
