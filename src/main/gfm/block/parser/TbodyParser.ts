import {BlockParser, BlockNodeCtor} from "./../../../BlockParser";
import {Tbody} from "./../node/TableNode";

export class TbodyParser extends BlockParser<Tbody> {
    public constructor (nodeType : string = "tbody", nodeCtor : BlockNodeCtor<Tbody> = Tbody) {
        super(nodeType, nodeCtor);
    }
    public continue () : boolean { return false; }
    public finalize () {}
    public canContain () { return false; }
}
