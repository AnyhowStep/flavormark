import {BlockParser, BlockNodeCtor} from "./../../../BlockParser";
import {TheadNode} from "./../node/TheadNode";

export class TheadParser extends BlockParser<TheadNode> {
    public constructor (nodeCtor : BlockNodeCtor<TheadNode> = TheadNode) {
        super(nodeCtor);
    }
    public continue () : boolean { return false; }
    public finalize () {}
    public canContain () { return false; }
}
