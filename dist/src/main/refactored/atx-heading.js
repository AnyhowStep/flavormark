"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("../BlockParser");
const HeadingNode_1 = require("./HeadingNode");
var reATXHeadingMarker = /^#{1,6}(?:[ \t]+|$)/;
class AtxHeadingParser extends BlockParser_1.BlockParser {
    constructor() {
        super(...arguments);
        this.acceptsLines = false;
        this.parseInlines = true;
        this.isLeaf = true;
    }
    tryStart(parser) {
        var match;
        if (!parser.indented &&
            (match = parser.currentLine.slice(parser.nextNonspace).match(reATXHeadingMarker))) {
            parser.advanceNextNonspace();
            parser.advanceOffset(match[0].length, false);
            parser.closeUnmatchedBlocks();
            const container = parser.addChild(this, parser.nextNonspace);
            container.level = match[0].trim().length; // number of #s
            // remove trailing ###s:
            container.string_content =
                parser.currentLine.slice(parser.offset).replace(/^[ \t]*#+[ \t]*$/, '').replace(/[ \t]+#+[ \t]*$/, '');
            parser.advanceOffset(parser.currentLine.length - parser.offset);
            return true;
        }
        else {
            return false;
        }
    }
    ;
    continue() {
        // a heading can never container > 1 line, so fail to match:
        return false;
    }
    ;
    finalize() { }
    canContain() { return false; }
    getString(node) {
        return node.string_content || "";
    }
    // allow raw string to be garbage collected
    unsetString(node) {
        node.string_content = undefined;
    }
}
exports.AtxHeadingParser = AtxHeadingParser;
exports.atxHeadingParser = new AtxHeadingParser("atx_heading", HeadingNode_1.HeadingNode);
//# sourceMappingURL=atx-heading.js.map