"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const util_1 = require("./../../../refactored/util");
const BlockquoteNode_1 = require("./../node/BlockquoteNode");
class BlockquoteParser extends BlockParser_1.BlockParser {
    constructor(nodeCtor = BlockquoteNode_1.BlockquoteNode) {
        super(nodeCtor);
        this.acceptsLines = false;
    }
    tryStart(parser) {
        if (parser.indented) {
            return false;
        }
        if (parser.currentLine[parser.nextNonspace] != BlockquoteParser.START_CHAR) {
            return false;
        }
        parser.advanceNextNonspace();
        parser.advanceOffset(1, false);
        // optional following space
        if (util_1.isSpaceOrTab(parser.currentLine[parser.offset])) {
            parser.advanceOffset(1, true);
        }
        parser.closeUnmatchedBlocks();
        parser.addChild(this, parser.nextNonspace);
        return true;
    }
    continue(parser) {
        if (parser.indented) {
            return false;
        }
        if (parser.currentLine[parser.nextNonspace] != BlockquoteParser.START_CHAR) {
            return false;
        }
        parser.advanceNextNonspace();
        parser.advanceOffset(1, false);
        if (util_1.isSpaceOrTab(parser.currentLine[parser.offset])) {
            parser.advanceOffset(1, true);
        }
        return true;
    }
    finalize() { }
    canContain() { return true; }
    ignoreLastLineBlank() {
        return true;
    }
}
BlockquoteParser.START_CHAR = ">";
exports.BlockquoteParser = BlockquoteParser;
//# sourceMappingURL=BlockquoteParser.js.map