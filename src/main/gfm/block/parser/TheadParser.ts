import {BlockParser, BlockNodeCtor} from "./../../../BlockParser";
import {Thead} from "./../node/TableNode";

export class TheadParser extends BlockParser<Thead> {
    public constructor (nodeType : string = "thead", nodeCtor : BlockNodeCtor<Thead> = Thead) {
        super(nodeType, nodeCtor);
    }
    public continue () : boolean { return false; }
    public finalize () {}
    public canContain () { return false; }
}
