"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InlineParser_1 = require("../InlineParser");
//import {Node} from "./Node";
//import {CodeNode} from "./CodeNode";
const LatexNode_1 = require("./LatexNode");
var C_DOLLAR = 36;
var reDollar = /.\$/;
//Consider not replacing \n in inline latex block
var reWhitespace = /[ \t\n\x0b\x0c\x0d]+/g;
class InlineLatexParser extends InlineParser_1.InlineParser {
    // All of the parsers below try to match something at the current position
    // in the subject.  If they succeed in matching anything, they
    // return the inline matched, advancing the subject.
    // Attempt to parse backticks, adding either a backtick code span or a
    // literal sequence of backticks.
    parse(parser, block) {
        const c = parser.peek();
        if (c != C_DOLLAR) {
            return false;
        }
        var startpos = parser.pos;
        ++parser.pos;
        if (parser.peek() == C_DOLLAR) {
            //Empty inline latex
            let node = new LatexNode_1.LatexNode('latex');
            node.literal = "";
            block.appendChild(node);
            ++parser.pos;
            return true;
        }
        else {
            --parser.pos;
        }
        var matched;
        var node;
        while ((matched = parser.match(reDollar)) != undefined) {
            if (/[^\\]\$/.test(matched)) {
                node = new LatexNode_1.LatexNode('latex');
                node.literal = parser.subject.slice(startpos + 1, parser.pos - 1).trim().replace(reWhitespace, ' ');
                block.appendChild(node);
                return true;
            }
        }
        // If we got here, we didn't match a closing sequence.
        parser.pos = startpos + 1;
        block.appendChild(parser.text("$"));
        return true;
    }
}
exports.InlineLatexParser = InlineLatexParser;
//# sourceMappingURL=InlineLatexParser.js.map