import {Parser} from "../blocks";
import {Node} from "../node";
import {BlockParser} from "./BlockParser";

var reATXHeadingMarker = /^#{1,6}(?:[ \t]+|$)/;

class AtxHeadingParser extends BlockParser<Node> {
    tryStart=(parser : Parser) => {
        var match;
        if (!parser.indented &&
            (match = parser.currentLine.slice(parser.nextNonspace).match(reATXHeadingMarker))) {
            parser.advanceNextNonspace();
            parser.advanceOffset(match[0].length, false);
            parser.closeUnmatchedBlocks();
            var container = parser.addChild('atx_heading', parser.nextNonspace);
            container.level = match[0].trim().length; // number of #s
            // remove trailing ###s:
            container.string_content =
                parser.currentLine.slice(parser.offset).replace(/^[ \t]*#+[ \t]*$/, '').replace(/[ \t]+#+[ \t]*$/, '');
            parser.advanceOffset(parser.currentLine.length - parser.offset);
            return true;
        } else {
            return false;
        }
    };
    continue=() => {
        // a heading can never container > 1 line, so fail to match:
        return false;
    };
    finalize = ()=> { return; };
    canContain= () =>{ return false; };
    acceptsLines= false;
    parseInlines = true;
    isLeaf = true;
}

export const atxHeadingParser = new AtxHeadingParser();
