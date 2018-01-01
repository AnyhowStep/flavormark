import {BlockParser} from "./BlockParser";
import {Parser} from "../blocks";
import {Node} from "../node";
import {peek, isSpaceOrTab} from "./util";

var C_GREATERTHAN = 62;

export class BlockquoteParser extends BlockParser {
    tryStart= (parser : Parser) => {
        if (!parser.indented &&
            peek(parser.currentLine, parser.nextNonspace) === C_GREATERTHAN) {
            parser.advanceNextNonspace();
            parser.advanceOffset(1, false);
            // optional following space
            if (isSpaceOrTab(peek(parser.currentLine, parser.offset))) {
                parser.advanceOffset(1, true);
            }
            parser.closeUnmatchedBlocks();
            parser.addChild('block_quote', parser.nextNonspace);
            return true;
        } else {
            return false;
        }
    };
    continue= (parser : Parser) =>{
        var ln = parser.currentLine;
        if (!parser.indented &&
            peek(ln, parser.nextNonspace) === C_GREATERTHAN) {
            parser.advanceNextNonspace();
            parser.advanceOffset(1, false);
            if (isSpaceOrTab(peek(ln, parser.offset))) {
                parser.advanceOffset(1, true);
            }
        } else {
            return false;
        }
        return true;
    };
    finalize= ()=> { return; };
    canContain= (t:string) =>{ return (t !== 'item'); };
    acceptsLines = false;
    ignoreLastLineBlank = (_parser : Parser, _container : Node) => { return true; };
}

export const blockquoteParser = new BlockquoteParser("block_quote");
