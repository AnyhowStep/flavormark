import {BlockParser, BlockNodeCtor} from "./../../../BlockParser";
import {TdNode} from "./../node/TdNode";

export class TdParser extends BlockParser<TdNode> {
    public parseInlines = true;
    public constructor (nodeCtor : BlockNodeCtor<TdNode> = TdNode) {
        super(nodeCtor);
    }
    public continue () : boolean { return false; }
    public finalize () {}
    public canContain () { return false; }
    public getString (node : TdNode) : string {
        return node.stringContent;
    }
}
