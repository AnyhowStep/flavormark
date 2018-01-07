import {BlockParser, BlockNodeCtor} from "./../../../BlockParser";
import {Td} from "./../node/TableNode";

export class TdParser extends BlockParser<Td> {
    public parseInlines = true;
    public constructor (nodeType : string = "td", nodeCtor : BlockNodeCtor<Td> = Td) {
        super(nodeType, nodeCtor);
    }
    public continue () : boolean { return false; }
    public finalize () {}
    public canContain () { return false; }
    public getString (node : Td) : string {
        return node.string_content;
    }
}
