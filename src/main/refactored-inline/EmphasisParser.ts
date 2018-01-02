import {InParser} from "./InParser";
import {InlineParser} from "../inlines";
import {BlockNode} from "../refactored/BlockNode";
//import {InlineNode} from "./InlineNode";
import {DelimiterCollection} from "../refactored-misc/DelimiterCollection";
import {processEmphasis} from "../refactored-misc/emphasis";

export class EmphasisParser extends InParser {
    private delimiters : DelimiterCollection;
    public constructor (delimiters : DelimiterCollection) {
        super();
        this.delimiters = delimiters;
    }

    public parse (_parser : InlineParser, _block : BlockNode) : boolean {
        return false;
    }
    public finalize () : void {
        processEmphasis(this.delimiters, null);
    }

}
