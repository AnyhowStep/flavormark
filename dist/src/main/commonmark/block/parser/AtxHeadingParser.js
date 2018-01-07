"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const HeadingNode_1 = require("./../node/HeadingNode");
const reATXHeadingMarker = /^#{1,6}(?:[ \t]+|$)/;
class AtxHeadingParser extends BlockParser_1.BlockParser {
    constructor(nodeType = "atx_heading", nodeCtor = HeadingNode_1.HeadingNode) {
        super(nodeType, nodeCtor);
        this.acceptsLines = false;
        this.parseInlines = true;
        this.isLeaf = true;
    }
    tryStart(parser) {
        if (parser.indented) {
            return false;
        }
        const match = parser.currentLine.slice(parser.nextNonspace).match(reATXHeadingMarker);
        if (match == null) {
            return false;
        }
        parser.advanceNextNonspace();
        parser.advanceOffset(match[0].length, false);
        parser.closeUnmatchedBlocks();
        const heading = parser.addChild(this, parser.nextNonspace);
        heading.level = match[0].trim().length; // number of #s
        // remove trailing ###s:
        heading.stringContent = parser.currentLine
            .slice(parser.offset)
            .replace(/^[ \t]*#+[ \t]*$/, "")
            .replace(/[ \t]+#+[ \t]*$/, "");
        parser.advanceOffset(parser.currentLine.length - parser.offset);
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
exports.AtxHeadingParser = AtxHeadingParser;
//# sourceMappingURL=AtxHeadingParser.js.map