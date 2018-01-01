import {Parser} from "../blocks";
import {Node} from "../node";
import {peek} from "./util";
import {OPENTAG, CLOSETAG} from "../common";

var C_LESSTHAN = 60;


var reHtmlBlockOpen = [
   /./, // dummy for 0
   /^<(?:script|pre|style)(?:\s|>|$)/i,
   /^<!--/,
   /^<[?]/,
   /^<![A-Z]/,
   /^<!\[CDATA\[/,
   /^<[/]?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[123456]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|title|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|[/]?[>]|$)/i,
    new RegExp('^(?:' + OPENTAG + '|' + CLOSETAG + ')\\s*$', 'i')
];


export const htmlBlockParser = {
    tryStart: function(parser : Parser, container : Node) {
        if (!parser.indented &&
            peek(parser.currentLine, parser.nextNonspace) === C_LESSTHAN) {
            var s = parser.currentLine.slice(parser.nextNonspace);
            var blockType;

            for (blockType = 1; blockType <= 7; blockType++) {
                if (reHtmlBlockOpen[blockType].test(s) &&
                    (blockType < 7 ||
                     container.type !== 'paragraph')) {
                    parser.closeUnmatchedBlocks();
                    // We don't adjust parser.offset;
                    // spaces are part of the HTML block:
                    var b = parser.addChild('html_block',
                                            parser.offset);
                    b.htmlBlockType = blockType;
                    return 2;
                }
            }
        }

        return 0;

    },
    continue: function(parser : Parser, container : Node) {
        return (
            (
                parser.blank &&
                (
                    container.htmlBlockType === 6 ||
                    container.htmlBlockType === 7
                )
            ) ? 1 : 0
        );
    },
    finalize: function(_parser : Parser, block : Node) {
        if (block.string_content == null) {
            throw new Error("block.string_content cannot be null")
        }
        block.literal = block.string_content.replace(/(\n *)+$/, '');
        block.string_content = null; // allow GC
    },
    canContain: function() { return false; },
    acceptsLines: true
};
