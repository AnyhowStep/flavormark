"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const util_1 = require("./../../../refactored/util");
const TexBlockNode_1 = require("./../node/TexBlockNode");
var reCodeFence = /^\${2,}(?!.*`)/;
var reClosingCodeFence = /^(?:\${2,})(?= *$)/;
class TexBlockParser extends BlockParser_1.BlockParser {
    constructor(nodeCtor = TexBlockNode_1.TexBlockNode) {
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
        if (match == undefined) {
            return false;
        }
        const fenceLength = match[0].length;
        parser.closeUnmatchedBlocks();
        const texBlock = parser.addChild(this, parser.nextNonspace);
        texBlock.fenceLength = fenceLength;
        texBlock.fenceChar = match[0][0];
        texBlock.fenceOffset = parser.indent;
        parser.advanceNextNonspace();
        parser.advanceOffset(fenceLength, false);
        const sameLineEndMatch = parser.currentLine.slice(parser.offset).match(/(\${2,})\s*$/);
        if (sameLineEndMatch != undefined) {
            if (sameLineEndMatch[1].length == fenceLength) {
                if (sameLineEndMatch.index == undefined) {
                    throw new Error("index cannot be undefined");
                }
                //End now
                texBlock.oneLine = true;
                texBlock.stringContent = parser.currentLine.slice(parser.offset, parser.offset + sameLineEndMatch.index);
                parser.advanceOffset(parser.currentLine.length - parser.offset, false);
                parser.finalize(texBlock, parser.lineNumber);
            }
        }
        return true;
    }
    continue(parser, node) {
        if (node.oneLine) {
            return false;
        }
        const ln = parser.currentLine;
        let match = null;
        if (!parser.indented &&
            ln.charAt(parser.nextNonspace) === node.fenceChar) {
            match = ln.slice(parser.nextNonspace).match(reClosingCodeFence);
        }
        if (match != undefined && match[0].length >= node.fenceLength) {
            parser.finalize(node, parser.lineNumber);
            return false;
        }
        for (let i = node.fenceOffset; i > 0 && util_1.isSpaceOrTab(ln[parser.offset]); --i) {
            parser.advanceOffset(1, true);
        }
        return true;
    }
    finalize(_parser, block) {
        let content = block.stringContent;
        if (content == undefined) {
            throw new Error("content cannot be undefined");
        }
        content = content.replace(/^\$/, "\\$");
        while (/[^\\]\$/.test(content)) {
            content = content.replace(/([^\\])\$/, "$1\\$");
        }
        block.literal = content;
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
exports.TexBlockParser = TexBlockParser;
//# sourceMappingURL=TexBlockParser.js.map