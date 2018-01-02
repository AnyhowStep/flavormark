import {InlineNode} from "./refactored-inline/InlineNode";
import {TextNode} from "./refactored-inline/TextNode";
import {fromCodePoint} from "./from-code-point";
import {BlockParser} from "./refactored/BlockParser";
import {BlockNode} from "./refactored/BlockNode";
import {InParser} from "./refactored-inline/InParser";
import {RegexStream} from "./refactored-misc/RegexStream";

// These are methods of an InlineParser object, defined below.
// An InlineParser keeps track of a subject (a string to be
// parsed) and a position in that subject.
//TODO consider having InlineParser CONTAIN RegexStream, rather than extending.
//     It makes more sense since the role of the parser isn't really to be a regex stream
export class InlineParser extends RegexStream {
    private inParsers : InParser[];
    public constructor (inParsers : InParser[]) {
        super("");
        this.inParsers = inParsers;
    }

    public text (s : string) : InlineNode {
        return new TextNode(s);
    }
    public isTextNode (node : InlineNode) : node is TextNode {
        return node instanceof TextNode;
    }

    // Parse the next inline element in subject, advancing subject position.
    // On success, add the result to block's children and return true.
    // On failure, return false.
    public parseInline (block : BlockNode) {
        var c = this.peek();
        if (c === -1) {
            return false;
        }
        for (let p of this.inParsers) {
            if (p.parse(this, block)) {
                return true;
            }
        }
        this.pos += 1;
        block.appendChild(this.text(fromCodePoint(c)));
        return true;
    };

    // Parse string content in block into inline children,
    public parse (blockParser : BlockParser, block : BlockNode) {
        for (let i of this.inParsers) {
            i.reinit();
        }
        this.subject = (blockParser.getString(block)).trim();
        this.pos = 0;
        while (this.parseInline(block)) {
        }
        blockParser.unsetString(block); // allow raw string to be garbage collected
        for (let i of this.inParsers) {
            i.finalize();
        }
    }
}
