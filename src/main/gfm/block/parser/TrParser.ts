import {BlockParser, BlockNodeCtor} from "./../../../BlockParser";
import {Tr} from "./../node/TableNode";

export class TrParser extends BlockParser<Tr> {
    public constructor (nodeType : string = "tr", nodeCtor : BlockNodeCtor<Tr> = Tr) {
        super(nodeType, nodeCtor);
    }
    public continue () : boolean { return false; }
    public finalize () {}
    public canContain () { return false; }
}
