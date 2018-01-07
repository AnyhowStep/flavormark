import {BlockParser, BlockNodeCtor} from "./../../../BlockParser";
import {TrNode} from "./../node/TrNode";

export class TrParser extends BlockParser<TrNode> {
    public constructor (nodeCtor : BlockNodeCtor<TrNode> = TrNode) {
        super(nodeCtor);
    }
    public continue () : boolean { return false; }
    public finalize () {}
    public canContain () { return false; }
}
