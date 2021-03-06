"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const string_util_1 = require("./../../string-util");
const common_1 = require("./../../common");
const FencedCodeBlockNode_1 = require("./../node/FencedCodeBlockNode");
const reCodeFence = /^`{3,}(?!.*`)|^~{3,}(?!.*~)/;
const reClosingCodeFence = /^(?:`{3,}|~{3,})(?= *$)/;
class FencedCodeBlockParser extends BlockParser_1.BlockParser {
    constructor(nodeCtor = FencedCodeBlockNode_1.FencedCodeBlockNode) {
        super(nodeCtor);
        this.acceptsLines = true;
        this.earlyExitOnEnd = true;
        this.isLeaf = true;
    }
    tryStart(parser) {
        if (parser.indented) {
            return false;
        }
        const match = parser.currentLine
            .slice(parser.nextNonspace)
            .match(reCodeFence);
        if (match == null) {
            return false;
        }
        const fenceLength = match[0].length;
        parser.closeUnmatchedBlocks();
        const fencedCodeBlock = parser.addChild(this, parser.nextNonspace);
        fencedCodeBlock.fenceLength = fenceLength;
        fencedCodeBlock.fenceChar = match[0][0];
        fencedCodeBlock.fenceOffset = parser.indent;
        parser.advanceNextNonspace();
        parser.advanceOffset(fenceLength, false);
        return true;
    }
    continue(parser, node) {
        const ln = parser.currentLine;
        if (!parser.indented &&
            ln.charAt(parser.nextNonspace) === node.fenceChar) {
            const match = ln.slice(parser.nextNonspace).match(reClosingCodeFence);
            if (match != undefined && match[0].length >= node.fenceLength) {
                // closing fence - we're at end of line, so we can return
                parser.finalize(node, parser.lineNumber);
                return false;
            }
        }
        // skip optional spaces of fence offset
        for (let i = node.fenceOffset; i > 0 && string_util_1.isSpaceOrTab(ln[parser.offset]); --i) {
            parser.advanceOffset(1, true);
        }
        return true;
    }
    finalize(_parser, node) {
        // first line becomes info string
        const content = node.stringContent;
        if (content == undefined) {
            throw new Error("content cannot be undefined");
        }
        const newlinePos = content.indexOf('\n');
        const firstLine = content.slice(0, newlinePos);
        const rest = content.slice(newlinePos + 1);
        node.info = common_1.unescapeString(firstLine.trim());
        node.literal = rest;
    }
    canContain() { return false; }
    ignoreLastLineBlank() {
        return true;
    }
    appendString(node, str) {
        node.stringContent += str;
    }
    getString(node) {
        return node.stringContent;
    }
}
exports.FencedCodeBlockParser = FencedCodeBlockParser;
//# sourceMappingURL=FencedCodeBlockParser.js.map