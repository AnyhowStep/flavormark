"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("./../../../InlineParser");
const CheckboxNode_1 = require("./../node/CheckboxNode");
const ItemParser_1 = require("./../../../commonmark/block/parser/ItemParser");
class CheckboxParser extends InlineParser_1.InlineParser {
    parse(inlineContentParser, node, blockParser, parser) {
        if (parser.isParagraphNode(node)) {
            const parent = node.getParent();
            if (parent == undefined) {
                return false;
            }
            node = parent;
            blockParser = parser.getBlockParser(node);
        }
        if (!(blockParser instanceof ItemParser_1.ItemParser)) {
            return false;
        }
        if (inlineContentParser.pos != 0) {
            return false;
        }
        //console.log(parser.pos, parser.subject.substr(parser.pos));
        const m = inlineContentParser.match(/^\s*\[(\s|x|X)\]/);
        if (m == undefined) {
            return false;
        }
        const checkCharacter = m[m.length - 2];
        const checked = (checkCharacter == "x" || checkCharacter == "X");
        var checkbox = new CheckboxNode_1.CheckboxNode("checkbox");
        checkbox.checked = checked;
        node.prependChild(checkbox);
        return true;
    }
}
exports.CheckboxParser = CheckboxParser;
//# sourceMappingURL=CheckboxParser.js.map