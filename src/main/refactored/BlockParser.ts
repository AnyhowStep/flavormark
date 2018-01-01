import {Parser} from "../blocks";
import {Node} from "../node";

export interface BlockParser {
    tryStart?: (parser : Parser, container : Node) => 0|1|2,
    continue: (parser : Parser, block : Node) => boolean,
    finalize: (parser : Parser, block : Node) => void,
    canContain: (t:string) => boolean,
    acceptsLines: boolean,
    earlyExitOnEnd? : boolean,
    ignoreLastLineBlank? : ((parser : Parser, container : Node) => boolean),
};
