"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./BlockParser");
const util_1 = require("./util");
const BlockNode_1 = require("./BlockNode");
var C_GREATERTHAN = 62;
class BlockquoteParser extends BlockParser_1.BlockParser {
    constructor() {
        super(...arguments);
        this.tryStart = (parser) => {
            if (!parser.indented &&
                util_1.peek(parser.currentLine, parser.nextNonspace) === C_GREATERTHAN) {
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
            else {
                return false;
            }
        };
        this.continue = (parser) => {
            var ln = parser.currentLine;
            if (!parser.indented &&
                util_1.peek(ln, parser.nextNonspace) === C_GREATERTHAN) {
                parser.advanceNextNonspace();
                parser.advanceOffset(1, false);
                if (util_1.isSpaceOrTab(util_1.peek(ln, parser.offset))) {
                    parser.advanceOffset(1, true);
                }
            }
            else {
                return false;
            }
            return true;
        };
        this.finalize = () => { return; };
        this.canContain = (blockParser) => { return blockParser.isListItem != true; };
        this.acceptsLines = false;
        this.ignoreLastLineBlank = (_parser, _container) => { return true; };
    }
}
exports.BlockquoteParser = BlockquoteParser;
exports.blockquoteParser = new BlockquoteParser("block_quote", BlockNode_1.BlockNode);
//# sourceMappingURL=blockquote.js.map