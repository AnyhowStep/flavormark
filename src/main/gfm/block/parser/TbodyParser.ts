import {BlockParser, BlockNodeCtor} from "./../../../BlockParser";
import {TbodyNode} from "./../node/TbodyNode";

export class TbodyParser extends BlockParser<TbodyNode> {
    public constructor (nodeCtor : BlockNodeCtor<TbodyNode> = TbodyNode) {
        super(nodeCtor);
    }
    public continue () : boolean { return false; }
    public finalize () {}
    public canContain () { return false; }
}
