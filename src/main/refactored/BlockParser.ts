import {Parser} from "../blocks";
import {Node} from "../node";

export abstract class BlockParser<NodeT extends Node=Node> {
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
