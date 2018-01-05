"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("../InlineParser");
const CheckboxNode_1 = require("./CheckboxNode");
const item_1 = require("../refactored/item");
class CheckboxParser extends InlineParser_1.InlineParser {
    parse(parser, block, blockParser, mainParserThing) {
        if (mainParserThing.isParagraphNode(block)) {
            if (block.parent == null) {
                return false;
            }
            block = block.parent;
            blockParser = mainParserThing.getBlockParser(block);
        }
        if (!(blockParser instanceof item_1.ItemParser)) {
            return false;
        }
        if (parser.pos != 0) {
            return false;
        }
        //console.log(parser.pos, parser.subject.substr(parser.pos));
        const m = parser.match(/^\s*\[(\s|x|X)\]/);
        if (m == null) {
            return false;
        }
        const checkCharacter = m[m.length - 2];
        const checked = (checkCharacter == "x" || checkCharacter == "X");
        var node = new CheckboxNode_1.CheckboxNode("checkbox");
        node.checked = checked;
        block.prependChild(node);
        return true;
    }
}
exports.CheckboxParser = CheckboxParser;
//# sourceMappingURL=CheckboxParser.js.map