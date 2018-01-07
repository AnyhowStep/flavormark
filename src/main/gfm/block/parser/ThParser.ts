import {BlockParser, BlockNodeCtor} from "./../../../BlockParser";
import {Th} from "./../node/TableNode";

export class ThParser extends BlockParser<Th> {
    public parseInlines = true;
    public constructor (nodeType : string = "th", nodeCtor : BlockNodeCtor<Th> = Th) {
        super(nodeType, nodeCtor);
    }
    public continue () : boolean { return false; }
    public finalize () {}
    public canContain () { return false; }
    public getString (node : Th) : string {
        return node.string_content;
    }
}
