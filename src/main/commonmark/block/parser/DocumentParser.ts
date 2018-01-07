import {BlockParser, BlockNodeCtor} from "./../../../BlockParser";
import {DocumentNode} from "./../node/DocumentNode";

export class DocumentParser extends BlockParser<DocumentNode> {
    public acceptsLines = false;

    public constructor (nodeType : string = "document", nodeCtor : BlockNodeCtor<DocumentNode> = DocumentNode) {
        super(nodeType, nodeCtor);
    }

    public continue () { return true; }
    public finalize () {}
    public canContain () { return true; }
}
