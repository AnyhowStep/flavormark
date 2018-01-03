"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./BlockParser");
const util_1 = require("./util");
const common_1 = require("../common");
const HtmlBlockNode_1 = require("./HtmlBlockNode");
var C_LESSTHAN = 60;
var reHtmlBlockClose = [
    /./,
    /<\/(?:script|pre|style)>/i,
    /-->/,
    /\?>/,
    />/,
    /\]\]>/
];
var reHtmlBlockOpen = [
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
    constructor() {
        super(...arguments);
        this.tryStart = (parser, container) => {
            if (!parser.indented &&
                util_1.peek(parser.currentLine, parser.nextNonspace) === C_LESSTHAN) {
                var s = parser.currentLine.slice(parser.nextNonspace);
                var blockType;
                for (blockType = 1; blockType <= 7; blockType++) {
                    if (reHtmlBlockOpen[blockType].test(s) &&
                        (blockType < 7 ||
                            !parser.isParagraphNode(container))) {
                        parser.closeUnmatchedBlocks();
                        // We don't adjust parser.offset;
                        // spaces are part of the HTML block:
                        var b = parser.addChild(this, parser.offset);
                        b.htmlBlockType = blockType;
                        return true;
                    }
                }
            }
            return false;
        };
        this.continue = (parser, container) => {
            return ((parser.blank &&
                (container.htmlBlockType === 6 ||
                    container.htmlBlockType === 7)) ? false : true);
        };
        this.finalize = (_parser, block) => {
            if (block.string_content == null) {
                throw new Error("block.string_content cannot be null");
            }
            block.literal = block.string_content.replace(/(\n *)+$/, '');
            block.string_content = null; // allow GC
        };
        this.canContain = () => { return false; };
        this.acceptsLines = true;
        this.finalizeAtLine = (parser, container) => {
            return (container.htmlBlockType != null &&
                container.htmlBlockType >= 1 &&
                container.htmlBlockType <= 5 &&
                reHtmlBlockClose[container.htmlBlockType].test(parser.currentLine.slice(parser.offset)));
        };
        this.isLeaf = true;
    }
    appendString(node, str) {
        if (node.string_content == null) {
            node.string_content = "";
        }
        node.string_content += str;
    }
    getString(node) {
        return node.string_content || "";
    }
    // allow raw string to be garbage collected
    unsetString(node) {
        node.string_content = null;
    }
}
exports.HtmlBlockParser = HtmlBlockParser;
exports.htmlBlockParser = new HtmlBlockParser("html_block", HtmlBlockNode_1.HtmlBlockNode);
//# sourceMappingURL=html-block.js.map