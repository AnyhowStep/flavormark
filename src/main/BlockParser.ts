import {Parser} from "./Parser";
import {Node} from "./Node";

export type BlockNodeCtor<NodeT extends Node> = {
    new (nodeType : string, sourcepos : [[number, number], [number, number]]) : NodeT
};

export interface BlockParserMeta {
    canContain: (blockParser : BlockParserMeta, node : Node) => boolean;
    canBeContainedBy: (blockParser : BlockParserMeta, node : Node) => boolean;

    acceptsLines: boolean;
    earlyExitOnEnd? : boolean;
    parseInlines? : boolean;
    acceptLazyContinuation? : boolean; //This has no effect unless acceptsLines is true
    isLeaf? : boolean;
    isParagraph? : boolean; //Has no effect unless acceptsLines is true
    endsWithBlankLineIfLastChildEndsWithBlankLine? : boolean;
}

export abstract class BlockParser<NodeT extends Node=Node> implements BlockParserMeta {
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
    public reinit () {}

    tryStart?: (parser : Parser, container : Node) => boolean;
    continue: (parser : Parser, block : NodeT) => boolean = () => {
        throw new Error("Not implemented");
    }
    lazyContinue: (parser : Parser, block : NodeT) => void = () => {

    }
    finalize: (parser : Parser, block : NodeT) => void = () => {
        throw new Error("Not implemented");
    }
    ignoreLastLineBlank? : ((parser : Parser, container : NodeT) => boolean);
    finalizeAtLine? : (parser : Parser, container : NodeT) => boolean;

    public appendString (_node : NodeT, _str : string) : void {
        throw new Error(`appendString() not implemented for ${this.getNodeType()}`);
    } //Only called if acceptsLines is true
    public getString (_node : NodeT) : string {
        return "";
    }
    // allow raw string to be garbage collected
    public unsetString (_node : NodeT) : void {}
    public setString (_node : NodeT, _str : string) : void {

    }

    canContain: (blockParser : BlockParserMeta, node : Node) => boolean = () => {
        throw new Error("Not implemented");
    }
    canBeContainedBy: (blockParser : BlockParserMeta, node : Node) => boolean = () => {
        return true;
    }
    acceptsLines: boolean = false;
    earlyExitOnEnd? : boolean;
    parseInlines? : boolean;
    acceptLazyContinuation? : boolean; //If acceptsLines is true, calls appendString, otherwise lazyContinue()
    isLeaf? : boolean;
    isParagraph? : boolean; //Has no effect unless acceptsLines is true
    endsWithBlankLineIfLastChildEndsWithBlankLine? : boolean;

    public isActuallyParagraph () {
        return (this.acceptsLines == true && this.isParagraph == true);
    }
};
