"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("./../../../InlineParser");
const HardbreakNode_1 = require("./../node/HardbreakNode");
const SoftbreakNode_1 = require("./../node/SoftbreakNode");
const reFinalSpace = / *$/;
const reInitialSpace = /^ */;
class NewlineParser extends InlineParser_1.InlineParser {
    parse(parser, node) {
        const c = parser.peek();
        if (c != "\n") {
            return false;
        }
        ++parser.pos;
        // check previous node for trailing spaces
        const lastc = node.getLastChild();
        if (lastc != undefined &&
            parser.isTextNode(lastc) &&
            lastc.getString()[lastc.getString().length - 1] === " ") {
            const isHardbreak = lastc.getString()[lastc.getString().length - 2] === " ";
            lastc.setString(lastc.getString().replace(reFinalSpace, ""));
            if (isHardbreak) {
                node.appendChild(new HardbreakNode_1.HardbreakNode());
            }
            else {
                node.appendChild(new SoftbreakNode_1.SoftbreakNode());
            }
        }
        else {
            node.appendChild(new SoftbreakNode_1.SoftbreakNode());
        }
        parser.match(reInitialSpace); // gobble leading spaces in next line
        return true;
    }
}
exports.NewlineParser = NewlineParser;
//# sourceMappingURL=NewlineParser.js.map