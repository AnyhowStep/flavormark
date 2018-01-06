import {BlockParser} from "../BlockParser";
import {Parser} from "../Parser";
import {Node} from "../Node";

import {HeadingNode} from "../commonmark/HeadingNode";

var reSetextHeadingLine = /^(?:=+|-+)[ \t]*$/;

export class SetextHeadingParser extends BlockParser<HeadingNode> {
    tryStart (parser : Parser, container : Node) {
        var match;
        if (
            !parser.indented &&
            parser.isParagraphNode(container) &&
            ((match = parser.currentLine.slice(parser.nextNonspace).match(reSetextHeadingLine)))
       ) {
            parser.closeUnmatchedBlocks();
            var heading = new HeadingNode(this.getNodeType(), container.sourceRange);
            heading.level = match[0][0] === '=' ? 1 : 2;
            heading.stringContent = parser.getBlockParsers().getParagraphParser().getString(container);
            container.insertAfter(heading);
            container.unlink();
            parser.tip = heading;
            parser.advanceOffset(parser.currentLine.length - parser.offset, false);
            return true;
        } else {
            return false;
        }
    };
    continue () {
        // a heading can never container > 1 line, so fail to match:
        return false;
    };
    finalize () {}
    canContain () { return false; }
    acceptsLines= false;
    parseInlines = true;
    isLeaf = true;
    public getString (node : HeadingNode) : string {
        return node.stringContent || "";
    }
}

export const setextHeadingParser = new SetextHeadingParser("setext_heading", HeadingNode);
