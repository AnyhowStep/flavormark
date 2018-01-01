import {Parser} from "../blocks";
//import {Node} from "../node";
import {BlockNode} from "./BlockNode";

export abstract class BlockParser<NodeT extends BlockNode=BlockNode> {
    private readonly nodeType : string;
    public constructor (nodeType : string) {
        this.nodeType = nodeType;
    }

    public getNodeType () : string {
        return this.nodeType;
    }

    //getNodeCtor: () => {new(nodeType : NodeType, sourcepos : [[number, number], [number, number]]):NodeT};
    tryStart?: (parser : Parser, container : NodeT) => boolean;
    continue: (parser : Parser, block : NodeT) => boolean;
    finalize: (parser : Parser, block : NodeT) => void;
    canContain: (t:string) => boolean;
    acceptsLines: boolean;
    earlyExitOnEnd? : boolean;
    ignoreLastLineBlank? : ((parser : Parser, container : NodeT) => boolean);
    parseInlines? : boolean;
    finalizeAtLine? : (parser : Parser, container : NodeT) => boolean;
    acceptLazyContinuation? : boolean; //This has no effect unless acceptsLines is true
    isLeaf? : boolean;
    isParagraph? : boolean; //Has no effect unless acceptsLines is true
};
