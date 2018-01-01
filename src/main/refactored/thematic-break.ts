import {Parser} from "../blocks";

var reThematicBreak = /^(?:(?:\*[ \t]*){3,}|(?:_[ \t]*){3,}|(?:-[ \t]*){3,})[ \t]*$/;

export const thematicBreakParser = {
    tryStart: function(parser : Parser) {
        if (!parser.indented &&
            reThematicBreak.test(parser.currentLine.slice(parser.nextNonspace))) {
            parser.closeUnmatchedBlocks();
            parser.addChild('thematic_break', parser.nextNonspace);
            parser.advanceOffset(parser.currentLine.length - parser.offset, false);
            return true;
        } else {
            return false;
        }
    },
    continue: function() : boolean {
        // a thematic break can never container > 1 line, so fail to match:
        return false;
    },
    finalize: function() { return; },
    canContain: function() { return false; },
    acceptsLines: false,
    isLeaf : true,
}
