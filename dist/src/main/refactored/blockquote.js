"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("../BlockParser");
const Node_1 = require("../Node");
const util_1 = require("./util");
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
        this.canContain = () => { return true; };
        this.acceptsLines = false;
    }
    continue(parser) {
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
    }
    ;
    finalize() { }
    ignoreLastLineBlank() {
        return true;
    }
}
exports.BlockquoteParser = BlockquoteParser;
exports.blockquoteParser = new BlockquoteParser("block_quote", Node_1.Node);
//# sourceMappingURL=blockquote.js.map