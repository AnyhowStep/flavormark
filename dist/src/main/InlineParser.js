"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextNode_1 = require("./refactored-inline/TextNode");
const from_code_point_1 = require("./from-code-point");
const RegexStream_1 = require("./refactored-misc/RegexStream");
// These are methods of an InlineParser object, defined below.
// An InlineParser keeps track of a subject (a string to be
// parsed) and a position in that subject.
//TODO consider having InlineParser CONTAIN RegexStream, rather than extending.
//     It makes more sense since the role of the parser isn't really to be a regex stream
class InlineParser extends RegexStream_1.RegexStream {
    constructor(inParsers) {
        super("");
        this.inParsers = inParsers;
    }
    text(s) {
        return new TextNode_1.TextNode(s);
    }
    isTextNode(node) {
        return node instanceof TextNode_1.TextNode;
    }
    // Parse the next inline element in subject, advancing subject position.
    // On success, add the result to block's children and return true.
    // On failure, return false.
    parseInline(parser, blockParser, block) {
        var c = this.peek();
        //console.log("peek", this.pos, c, String.fromCharCode(c));
        if (c === -1) {
            return false;
        }
        for (let p of this.inParsers) {
            if (p.parse(this, block, blockParser, parser)) {
                //console.log("c", this.pos, c, fromCodePoint(c), this.inParsers.indexOf(p));
                return true;
            }
        }
        this.pos += 1;
        block.appendChild(this.text(from_code_point_1.fromCodePoint(c)));
        //console.log("adding text", c, fromCodePoint(c));
        return true;
    }
    ;
    // Parse string content in block into inline children,
    parse(parser, blockParser, block) {
        for (let i of this.inParsers) {
            i.reinit();
        }
        this.subject = (blockParser.getString(block)).trim();
        this.pos = 0;
        while (this.parseInline(parser, blockParser, block)) {
        }
        blockParser.unsetString(block); // allow raw string to be garbage collected
        for (let i of this.inParsers) {
            i.finalize();
        }
    }
}
exports.InlineParser = InlineParser;
//# sourceMappingURL=InlineParser.js.map