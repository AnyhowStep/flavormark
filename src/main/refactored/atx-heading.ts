import {Parser} from "../Parser";
import {BlockParser} from "../BlockParser";
import {HeadingNode} from "./HeadingNode";

var reATXHeadingMarker = /^#{1,6}(?:[ \t]+|$)/;

export class AtxHeadingParser extends BlockParser<HeadingNode> {
    tryStart=(parser : Parser) => {
        var match;
        if (!parser.indented &&
            (match = parser.currentLine.slice(parser.nextNonspace).match(reATXHeadingMarker))) {
            parser.advanceNextNonspace();
            parser.advanceOffset(match[0].length, false);
            parser.closeUnmatchedBlocks();
            const container : HeadingNode = parser.addChild<HeadingNode>(this, parser.nextNonspace);
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
    public getString (node : HeadingNode) : string {
        return node.string_content || "";
    }
    // allow raw string to be garbage collected
    public unsetString (node : HeadingNode) : void {
        node.string_content = null;
    }
}

export const atxHeadingParser = new AtxHeadingParser("atx_heading", HeadingNode);
