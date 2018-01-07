"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("./../../../InlineParser");
const HardbreakNode_1 = require("./../node/HardbreakNode");
const SoftbreakNode_1 = require("./../node/SoftbreakNode");
const C_NEWLINE = 10;
const reFinalSpace = / *$/;
const reInitialSpace = /^ */;
class NewlineParser extends InlineParser_1.InlineParser {
    parse(parser, block) {
        const c = parser.peek();
        if (c != C_NEWLINE) {
            return false;
        }
        ++parser.pos;
        // check previous node for trailing spaces
        const lastc = block.getLastChild();
        if (lastc != undefined &&
            parser.isTextNode(lastc) &&
            lastc.getString()[lastc.getString().length - 1] === " ") {
            const isHardbreak = lastc.getString()[lastc.getString().length - 2] === " ";
            lastc.setString(lastc.getString().replace(reFinalSpace, ""));
            if (isHardbreak) {
                block.appendChild(new HardbreakNode_1.HardbreakNode());
            }
            else {
                block.appendChild(new SoftbreakNode_1.SoftbreakNode());
            }
        }
        else {
            block.appendChild(new SoftbreakNode_1.SoftbreakNode());
        }
        parser.match(reInitialSpace); // gobble leading spaces in next line
        return true;
    }
}
exports.NewlineParser = NewlineParser;
//# sourceMappingURL=NewlineParser.js.map