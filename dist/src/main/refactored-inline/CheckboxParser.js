"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InParser_1 = require("../InParser");
const CheckboxNode_1 = require("./CheckboxNode");
class CheckboxParser extends InParser_1.InParser {
    parse(parser, block, blockParser, mainParserThing) {
        //console.log(block.type, blockParser.isListItem, parser.pos);
        if (mainParserThing.isParagraphNode(block)) {
            if (block.parent == null) {
                return false;
            }
            block = block.parent;
            blockParser = mainParserThing.getBlockParser(block);
        }
        if (blockParser.isListItem != true) {
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