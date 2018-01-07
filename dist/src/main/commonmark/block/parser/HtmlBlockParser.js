"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const common_1 = require("./../../common");
const HtmlBlockNode_1 = require("./../node/HtmlBlockNode");
const reHtmlBlockClose = [
    /./,
    /<\/(?:script|pre|style)>/i,
    /-->/,
    /\?>/,
    />/,
    /\]\]>/
];
const reHtmlBlockOpen = [
    /./,
    /^<(?:script|pre|style)(?:\s|>|$)/i,
    /^<!--/,
    /^<[?]/,
    /^<![A-Z]/,
    /^<!\[CDATA\[/,
    /^<[/]?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[123456]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|title|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|[/]?[>]|$)/i,
    new RegExp('^(?:' + common_1.OPENTAG + '|' + common_1.CLOSETAG + ')\\s*$', 'i')
];
class HtmlBlockParser extends BlockParser_1.BlockParser {
    constructor(nodeType = "html_block", nodeCtor = HtmlBlockNode_1.HtmlBlockNode) {
        super(nodeType, nodeCtor);
        this.acceptsLines = true;
        this.isLeaf = true;
    }
    tryStart(parser, node) {
        if (parser.indented) {
            return false;
        }
        //This line isn't really needed but helps with efficiency, I guess
        if (parser.currentLine[parser.nextNonspace] != HtmlBlockParser.START_CHAR) {
            return false;
        }
        const line = parser.currentLine.slice(parser.nextNonspace);
        for (let blockType = 1; blockType <= 7; ++blockType) {
            if (reHtmlBlockOpen[blockType].test(line) &&
                (blockType < 7 ||
                    !parser.isParagraphNode(node))) {
                parser.closeUnmatchedBlocks();
                // We don't adjust parser.offset;
                // spaces are part of the HTML block:
                const htmlBlock = parser.addChild(this, parser.offset);
                htmlBlock.htmlBlockType = blockType;
                return true;
            }
        }
        return false;
    }
    continue(parser, node) {
        return (!parser.blank ||
            (node.htmlBlockType != 6 &&
                node.htmlBlockType != 7));
    }
    finalize(_parser, node) {
        node.literal = node.stringContent.replace(/(\n *)+$/, '');
    }
    canContain() { return false; }
    finalizeAtLine(parser, node) {
        return (node.htmlBlockType != undefined &&
            node.htmlBlockType >= 1 &&
            node.htmlBlockType <= 5 &&
            reHtmlBlockClose[node.htmlBlockType].test(parser.currentLine.slice(parser.offset)));
    }
    appendString(node, str) {
        node.stringContent += str;
    }
    getString(node) {
        return node.stringContent;
    }
}
HtmlBlockParser.START_CHAR = "<";
exports.HtmlBlockParser = HtmlBlockParser;
//# sourceMappingURL=HtmlBlockParser.js.map