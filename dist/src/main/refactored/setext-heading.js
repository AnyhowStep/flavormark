"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./BlockParser");
const HeadingNode_1 = require("./HeadingNode");
var reSetextHeadingLine = /^(?:=+|-+)[ \t]*$/;
class SetextHeadingParser extends BlockParser_1.BlockParser {
    constructor() {
        super(...arguments);
        this.tryStart = (parser, container) => {
            var match;
            if (!parser.indented &&
                parser.isParagraphNode(container) &&
                ((match = parser.currentLine.slice(parser.nextNonspace).match(reSetextHeadingLine)))) {
                parser.closeUnmatchedBlocks();
                var heading = new HeadingNode_1.HeadingNode(this.getNodeType(), container.sourcepos);
                heading.level = match[0][0] === '=' ? 1 : 2;
                heading.string_content = container.string_content;
                container.insertAfter(heading);
                container.unlink();
                parser.tip = heading;
                parser.advanceOffset(parser.currentLine.length - parser.offset, false);
                return true;
            }
            else {
                return false;
            }
        };
        this.continue = () => {
            // a heading can never container > 1 line, so fail to match:
            return false;
        };
        this.finalize = () => { return; };
        this.canContain = () => { return false; };
        this.acceptsLines = false;
        this.parseInlines = true;
        this.isLeaf = true;
    }
    getString(node) {
        return node.string_content || "";
    }
    // allow raw string to be garbage collected
    unsetString(node) {
        node.string_content = null;
    }
}
exports.SetextHeadingParser = SetextHeadingParser;
exports.setextHeadingParser = new SetextHeadingParser("setext_heading", HeadingNode_1.HeadingNode);
//# sourceMappingURL=setext-heading.js.map