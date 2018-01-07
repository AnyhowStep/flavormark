"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const HeadingNode_1 = require("./../node/HeadingNode");
const reSetextHeadingLine = /^(?:=+|-+)[ \t]*$/;
class SetextHeadingParser extends BlockParser_1.BlockParser {
    constructor(nodeType = "setext_heading", nodeCtor = HeadingNode_1.HeadingNode) {
        super(nodeType, nodeCtor);
        this.acceptsLines = false;
        this.parseInlines = true;
        this.isLeaf = true;
    }
    tryStart(parser, node) {
        if (parser.indented) {
            return false;
        }
        if (!parser.isParagraphNode(node)) {
            return false;
        }
        const match = parser.currentLine
            .slice(parser.nextNonspace)
            .match(reSetextHeadingLine);
        if (match == null) {
            return false;
        }
        parser.closeUnmatchedBlocks();
        const heading = new HeadingNode_1.HeadingNode(this.getNodeType(), node.sourceRange);
        heading.level = (match[0][0] === "=") ?
            1 : 2;
        heading.stringContent = parser.getBlockParsers().getParagraphParser().getString(node);
        node.insertAfter(heading);
        node.unlink();
        parser.tip = heading;
        parser.advanceOffset(parser.currentLine.length - parser.offset, false);
        return true;
    }
    continue() {
        // a heading can never container > 1 line, so fail to match:
        return false;
    }
    finalize() { }
    canContain() { return false; }
    getString(node) {
        return node.stringContent;
    }
}
exports.SetextHeadingParser = SetextHeadingParser;
//# sourceMappingURL=SetextHeadingParser.js.map