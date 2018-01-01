import {BlockParser} from "./BlockParser";
import {Parser} from "../blocks";
import {BlockNode} from "./BlockNode";

var reThematicBreak = /^(?:(?:\*[ \t]*){3,}|(?:_[ \t]*){3,}|(?:-[ \t]*){3,})[ \t]*$/;

export class ThematicBreakParser extends BlockParser {
    tryStart= (parser : Parser) => {
        if (!parser.indented &&
            reThematicBreak.test(parser.currentLine.slice(parser.nextNonspace))) {
            parser.closeUnmatchedBlocks();
            parser.addChild(this, parser.nextNonspace);
            parser.advanceOffset(parser.currentLine.length - parser.offset, false);
            return true;
        } else {
            return false;
        }
    };
    continue= () : boolean => {
        // a thematic break can never container > 1 line, so fail to match:
        return false;
    };
    finalize= () => { return; };
    canContain= () => { return false; };
    acceptsLines= false;
    isLeaf = true;
}

export const thematicBreakParser = new ThematicBreakParser("thematic_break", BlockNode);
