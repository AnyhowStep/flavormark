import {Parser} from "../blocks";
import {Node} from "../node";

var reSetextHeadingLine = /^(?:=+|-+)[ \t]*$/;

export const setextHeadingParser = {
    tryStart: function(parser : Parser, container : Node) {
        var match;
        if (!parser.indented &&
            container.type === 'paragraph' &&
                   ((match = parser.currentLine.slice(parser.nextNonspace).match(reSetextHeadingLine)))) {
            parser.closeUnmatchedBlocks();
            var heading = new Node('setext_heading', container.sourcepos);
            heading.level = match[0][0] === '=' ? 1 : 2;
            heading.string_content = container.string_content;
            container.insertAfter(heading);
            container.unlink();
            parser.tip = heading;
            parser.advanceOffset(parser.currentLine.length - parser.offset, false);
            return 2;
        } else {
            return 0;
        }
    },
    continue: function() {
        // a heading can never container > 1 line, so fail to match:
        return false;
    },
    finalize: function() { return; },
    canContain: function() { return false; },
    acceptsLines: false,
    parseInlines : true,
}
