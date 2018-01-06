"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("../BlockParser");
//import {Node} from "../Node";
const util_1 = require("./util");
//import {unescapeString} from "../common";
//
const LatexBlockNode_1 = require("./LatexBlockNode");
var reCodeFence = /^\${2,}(?!.*`)/;
var reClosingCodeFence = /^(?:\${2,})(?= *$)/;
class LatexBlockParser extends BlockParser_1.BlockParser {
    constructor() {
        super(...arguments);
        this.acceptsLines = true;
        this.earlyExitOnEnd = true;
        this.isLeaf = true;
    }
    tryStart(parser) {
        var match;
        if (!parser.indented &&
            (match = parser.currentLine.slice(parser.nextNonspace).match(reCodeFence))) {
            var fenceLength = match[0].length;
            parser.closeUnmatchedBlocks();
            var container = parser.addChild(this, parser.nextNonspace);
            container.fenceLength = fenceLength;
            container.fenceChar = match[0][0];
            container.fenceOffset = parser.indent;
            parser.advanceNextNonspace();
            parser.advanceOffset(fenceLength, false);
            const sameLineEndMatch = parser.currentLine.slice(parser.offset).match(/(\${2,})\s*$/);
            if (sameLineEndMatch != undefined) {
                if (sameLineEndMatch[1].length == fenceLength) {
                    //End now
                    container.oneLine = true;
                    container.string_content = parser.currentLine.slice(parser.offset, sameLineEndMatch.index);
                    parser.advanceOffset(parser.currentLine.length - parser.offset, false);
                    parser.finalize(container, parser.lineNumber);
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    ;
    continue(parser, container) {
        if (container.oneLine) {
            return false;
        }
        var ln = parser.currentLine;
        var indent = parser.indent;
        var match = (indent <= 3 &&
            ln.charAt(parser.nextNonspace) === container.fenceChar &&
            ln.slice(parser.nextNonspace).match(reClosingCodeFence));
        if (match && match[0].length >= container.fenceLength) {
            // closing fence - we're at end of line, so we can return
            parser.finalize(container, parser.lineNumber);
            return false;
        }
        else {
            // skip optional spaces of fence offset
            var i = container.fenceOffset;
            if (i == undefined) {
                throw new Error("i cannot be undefined");
            }
            while (i > 0 && util_1.isSpaceOrTab(util_1.peek(ln, parser.offset))) {
                parser.advanceOffset(1, true);
                i--;
            }
        }
        return true;
    }
    ;
    finalize(_parser, block) {
        let content = block.string_content;
        if (content == undefined) {
            throw new Error("content cannot be undefined");
        }
        content = content.replace(/^\$/, "\\$");
        while (/[^\\]\$/.test(content)) {
            content = content.replace(/([^\\])\$/, "$1\\$");
        }
        block.literal = content;
        block.string_content = undefined; // allow GC
    }
    ;
    canContain() { return false; }
    ignoreLastLineBlank() {
        return true;
    }
    appendString(node, str) {
        if (node.string_content == undefined) {
            node.string_content = "";
        }
        node.string_content += str;
    }
    getString(node) {
        return node.string_content || "";
    }
    // allow raw string to be garbage collected
    unsetString(node) {
        node.string_content = undefined;
    }
}
exports.LatexBlockParser = LatexBlockParser;
exports.latexBlockParser = new LatexBlockParser("latex_block", LatexBlockNode_1.LatexBlockNode);
//# sourceMappingURL=latex-block.js.map