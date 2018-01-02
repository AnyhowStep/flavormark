import {BlockNode} from "./BlockNode";

export class HeadingNode extends BlockNode {
    public level : number = -1;
    public string_content : string|null = null;
}
