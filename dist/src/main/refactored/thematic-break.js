"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("../BlockParser");
const Node_1 = require("../Node");
var reThematicBreak = /^(?:(?:\*[ \t]*){3,}|(?:_[ \t]*){3,}|(?:-[ \t]*){3,})[ \t]*$/;
class ThematicBreakParser extends BlockParser_1.BlockParser {
    constructor() {
        super(...arguments);
        this.tryStart = (parser) => {
            if (!parser.indented &&
                reThematicBreak.test(parser.currentLine.slice(parser.nextNonspace))) {
                parser.closeUnmatchedBlocks();
                parser.addChild(this, parser.nextNonspace);
                parser.advanceOffset(parser.currentLine.length - parser.offset, false);
                return true;
            }
            else {
                return false;
            }
        };
        this.continue = () => {
            // a thematic break can never container > 1 line, so fail to match:
            return false;
        };
        this.finalize = () => { return; };
        this.canContain = () => { return false; };
        this.acceptsLines = false;
        this.isLeaf = true;
    }
}
exports.ThematicBreakParser = ThematicBreakParser;
exports.thematicBreakParser = new ThematicBreakParser("thematic_break", Node_1.Node);
//# sourceMappingURL=thematic-break.js.map