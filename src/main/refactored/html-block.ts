import {BlockParser} from "./BlockParser";
import {Parser} from "../blocks";
import {Node} from "../node";
import {peek} from "./util";
import {OPENTAG, CLOSETAG} from "../common";
import {BlockNode} from "./BlockNode";
import {HtmlBlockNode} from "./HtmlBlockNode";

var C_LESSTHAN = 60;

var reHtmlBlockClose = [
   /./, // dummy for 0
   /<\/(?:script|pre|style)>/i,
   /-->/,
   /\?>/,
   />/,
   /\]\]>/
];


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

export class HtmlBlockParser extends BlockParser<HtmlBlockNode> {
    tryStart= (parser : Parser, container : BlockNode) => {
        if (!parser.indented &&
            peek(parser.currentLine, parser.nextNonspace) === C_LESSTHAN) {
            var s = parser.currentLine.slice(parser.nextNonspace);
            var blockType;

            for (blockType = 1; blockType <= 7; blockType++) {
                if (reHtmlBlockOpen[blockType].test(s) &&
                    (blockType < 7 ||
                        !parser.isParagraphNode(container))) {
                    parser.closeUnmatchedBlocks();
                    // We don't adjust parser.offset;
                    // spaces are part of the HTML block:
                    var b = parser.addChild<HtmlBlockNode>(this, parser.offset);
                    b.htmlBlockType = blockType;
                    return true;
                }
            }
        }

        return false;

    };
    continue= (parser : Parser, container : HtmlBlockNode) => {
        return (
            (
                parser.blank &&
                (
                    container.htmlBlockType === 6 ||
                    container.htmlBlockType === 7
                )
            ) ? false : true
        );
    };
    finalize= (_parser : Parser, block : Node) => {
        if (block.string_content == null) {
            throw new Error("block.string_content cannot be null")
        }
        block.literal = block.string_content.replace(/(\n *)+$/, '');
        block.string_content = null; // allow GC
    };
    canContain= () => { return false; };
    acceptsLines= true;
    finalizeAtLine=(parser : Parser, container : HtmlBlockNode) => {
        return (
            container.htmlBlockType != null &&
            container.htmlBlockType >= 1 &&
            container.htmlBlockType <= 5 &&
            reHtmlBlockClose[container.htmlBlockType].test(parser.currentLine.slice(parser.offset))
        );
    };
    isLeaf = true;
    public appendString (node : BlockNode, str : string) : void {
        if (node.string_content == null) {
            node.string_content = "";
        }
        node.string_content += str;
    }
    public getString (node : BlockNode) : string {
        return node.string_content || "";
    }
    // allow raw string to be garbage collected
    public unsetString (node : BlockNode) : void {
        node.string_content = null;
    }
}

export const htmlBlockParser = new HtmlBlockParser("html_block", HtmlBlockNode);
