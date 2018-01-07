import {BlockParser, BlockNodeCtor} from "./../../../BlockParser";
import {TbodyNode} from "./../node/TbodyNode";

export class TbodyParser extends BlockParser<TbodyNode> {
    public constructor (nodeType : string = "tbody", nodeCtor : BlockNodeCtor<TbodyNode> = TbodyNode) {
        super(nodeType, nodeCtor);
    }
    public continue () : boolean { return false; }
    public finalize () {}
    public canContain () { return false; }
}
