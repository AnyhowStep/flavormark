"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextNode_1 = require("./TextNode");
const RegexStream_1 = require("./RegexStream");
// These are methods of an InlineContentParser object, defined below.
// An InlineContentParser keeps track of a subject (a string to be
// parsed) and a position in that subject.
//TODO consider having InlineContentParser CONTAIN RegexStream, rather than extending.
//     It makes more sense since the role of the parser isn't really to be a regex stream
class InlineContentParser extends RegexStream_1.RegexStream {
    constructor(args) {
        super("");
        this.inParsers = args.inParsers;
        this.textNodeCtor = (args.textNodeCtor == undefined) ?
            TextNode_1.TextNode :
            args.textNodeCtor;
    }
    text(s) {
        return new this.textNodeCtor(s);
    }
    isTextNode(node) {
        return node instanceof TextNode_1.TextNode;
    }
    // Parse the next inline element in subject, advancing subject position.
    // On success, add the result to block's children and return true.
    // On failure, return false.
    parseInline(parser, blockParser, block) {
        const c = this.peek();
        //console.log("peek", this.pos, c, String.fromCharCode(c));
        if (c == undefined) {
            return false;
        }
        for (let p of this.inParsers) {
            if (p.parse(this, block, blockParser, parser)) {
                //console.log("c", this.pos, c, fromCodePoint(c), this.inParsers.indexOf(p));
                return true;
            }
        }
        this.pos += 1;
        block.appendChild(this.text(c));
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
        for (let i of this.inParsers) {
            i.finalize();
        }
    }
}
exports.InlineContentParser = InlineContentParser;
//# sourceMappingURL=InlineContentParser.js.map