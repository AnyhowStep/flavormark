import {BlockParser} from "./BlockParser";
import {Parser} from "../Parser";
import {Node} from "../node";

import {HeadingNode} from "./HeadingNode";

var reSetextHeadingLine = /^(?:=+|-+)[ \t]*$/;

export class SetextHeadingParser extends BlockParser<HeadingNode> {
    tryStart= (parser : Parser, container : Node) => {
        var match;
        if (
            !parser.indented &&
            parser.isParagraphNode(container) &&
            ((match = parser.currentLine.slice(parser.nextNonspace).match(reSetextHeadingLine)))
       ) {
            parser.closeUnmatchedBlocks();
            var heading = new HeadingNode(this.getNodeType(), container.sourcepos);
            heading.level = match[0][0] === '=' ? 1 : 2;
            heading.string_content = parser.getBlockParsers().getParagraphParser().getString(container);
            container.insertAfter(heading);
            container.unlink();
            parser.tip = heading;
            parser.advanceOffset(parser.currentLine.length - parser.offset, false);
            return true;
        } else {
            return false;
        }
    };
    continue= () => {
        // a heading can never container > 1 line, so fail to match:
        return false;
    };
    finalize= () => { return; };
    canContain= () => { return false; };
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

export const setextHeadingParser = new SetextHeadingParser("setext_heading", HeadingNode);
