import {Parser} from "../blocks";
//import {Node} from "../node";
import {BlockNode} from "./BlockNode";

export type BlockNodeCtor<NodeT extends BlockNode> = {
    new (nodeType : string, sourcepos : [[number, number], [number, number]]) : NodeT
};

export abstract class BlockParser<NodeT extends BlockNode=BlockNode> {
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
    tryStart?: (parser : Parser, container : NodeT) => boolean;
    continue: (parser : Parser, block : NodeT) => boolean;
    finalize: (parser : Parser, block : NodeT) => void;
    canContain: (blockParser : BlockParser) => boolean;
    acceptsLines: boolean;
    earlyExitOnEnd? : boolean;
    ignoreLastLineBlank? : ((parser : Parser, container : NodeT) => boolean);
    parseInlines? : boolean;
    finalizeAtLine? : (parser : Parser, container : NodeT) => boolean;
    acceptLazyContinuation? : boolean; //This has no effect unless acceptsLines is true
    isLeaf? : boolean;
    isParagraph? : boolean; //Has no effect unless acceptsLines is true
    isList? : boolean;
    isListItem? : boolean;
};
