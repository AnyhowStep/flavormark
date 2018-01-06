import {Parser} from "./Parser";
import {Node} from "./Node";

export type BlockNodeCtor<NodeT extends Node> = {
    new (nodeType : string, sourcepos : [[number, number], [number, number]]) : NodeT
};

export interface BlockParserMeta {
    canContain       : (blockParser : BlockParserMeta, node : Node) => boolean;
    canBeContainedBy : (blockParser : BlockParserMeta, node : Node) => boolean;

    acceptsLines : boolean;
    //Has no effect unless acceptsLines is true
    isParagraph? : boolean;

    //If acceptsLines is true, calls appendString, otherwise lazyContinue()
    acceptLazyContinuation? : boolean;

    earlyExitOnEnd? : boolean;
    parseInlines?   : boolean;
    isLeaf?         : boolean;
    endsWithBlankLineIfLastChildEndsWithBlankLine? : boolean;
}

export abstract class BlockParser<NodeT extends Node=Node> implements BlockParserMeta {
    //BEGIN META
    canContain: (blockParser : BlockParserMeta, node : Node) => boolean = () => {
        throw new Error("Not implemented");
    }
    canBeContainedBy: (blockParser : BlockParserMeta, node : Node) => boolean = () => {
        return true;
    }

    acceptsLines : boolean = false;
    //Has no effect unless acceptsLines is true
    isParagraph? : boolean;

    //If acceptsLines is true, calls appendString, otherwise lazyContinue()
    acceptLazyContinuation? : boolean;

    earlyExitOnEnd? : boolean;
    parseInlines?   : boolean;
    isLeaf?         : boolean;
    endsWithBlankLineIfLastChildEndsWithBlankLine? : boolean;
    //END META

    private readonly nodeType : string;
    private readonly nodeCtor : BlockNodeCtor<NodeT>;
    public constructor (nodeType : string, nodeCtor : BlockNodeCtor<NodeT>) {
        this.nodeType = nodeType;
        this.nodeCtor = nodeCtor;
    }

    public getNodeType () : string {
        return this.nodeType;
    }
    public getNodeCtor () : BlockNodeCtor<NodeT> {
        return this.nodeCtor;
    }

    //Only called if acceptsLines is true
    public appendString (_node : NodeT, _str : string) : void {
        throw new Error(`appendString() not implemented for ${this.getNodeType()}`);
    }

    public getString (_node : NodeT) : string {
        return "";
    }
    public setString (_node : NodeT, _str : string) : void {

    }

    public isActuallyParagraph () {
        return (this.acceptsLines == true && this.isParagraph == true);
    }

    //Called before the parser starts parsing content
    public reinit () {}
    tryStart? : (parser : Parser, container : Node) => boolean;
    public abstract continue (_parser : Parser, _block : NodeT) : boolean;
    public lazyContinue (_parser : Parser, _block : NodeT) : void {

    }
    public finalizeAtLine  (_parser : Parser, _container : NodeT) : boolean {
        return false;
    }
    public abstract finalize (parser : Parser, block : NodeT) : void;
    public ignoreLastLineBlank (_parser : Parser, _container : NodeT) : boolean {
        return false;
    }
};
