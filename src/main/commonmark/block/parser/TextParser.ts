import {BlockParser, BlockNodeCtor} from "./../../../BlockParser";
import {TextNode} from "./../../../TextNode";


export class TextParser extends BlockParser<TextNode> {
    public acceptsLines = false;
    public isLeaf = true;

    public constructor (nodeType : string = "text", nodeCtor : BlockNodeCtor<TextNode> = TextNode) {
        super(nodeType, nodeCtor);
    }

    public tryStart () {
        return false;
    }
    public continue () : boolean {
        return false;
    };
    public finalize () {}
    public canContain () { return false; }
}
