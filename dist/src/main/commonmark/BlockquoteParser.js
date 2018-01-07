"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("../BlockParser");
const util_1 = require("../refactored/util");
const BlockquoteNode_1 = require("./block/node/BlockquoteNode");
var C_GREATERTHAN = 62;
class BlockquoteParser extends BlockParser_1.BlockParser {
    constructor(nodeType = "block_quote", nodeCtor = BlockquoteNode_1.BlockquoteNode) {
        super(nodeType, nodeCtor);
        this.acceptsLines = false;
    }
    tryStart(parser) {
        if (parser.indented) {
            return false;
        }
        if (util_1.peek(parser.currentLine, parser.nextNonspace) != C_GREATERTHAN) {
            return false;
        }
        parser.advanceNextNonspace();
        parser.advanceOffset(1, false);
        // optional following space
        if (util_1.isSpaceOrTab(util_1.peek(parser.currentLine, parser.offset))) {
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
        if (util_1.peek(parser.currentLine, parser.nextNonspace) != C_GREATERTHAN) {
            return false;
        }
        parser.advanceNextNonspace();
        parser.advanceOffset(1, false);
        if (util_1.isSpaceOrTab(util_1.peek(parser.currentLine, parser.offset))) {
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
exports.BlockquoteParser = BlockquoteParser;
//# sourceMappingURL=BlockquoteParser.js.map