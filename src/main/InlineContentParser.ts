import {TextNode} from "./refactored-inline/TextNode";
import {fromCodePoint} from "./from-code-point";
import {BlockParser} from "./BlockParser";
import {InParser} from "./InParser";
import {RegexStream} from "./refactored-misc/RegexStream";
import {Node} from "./Node";
import {Parser} from "./Parser";

// These are methods of an InlineContentParser object, defined below.
// An InlineContentParser keeps track of a subject (a string to be
// parsed) and a position in that subject.
//TODO consider having InlineContentParser CONTAIN RegexStream, rather than extending.
//     It makes more sense since the role of the parser isn't really to be a regex stream
export class InlineContentParser extends RegexStream {
    private inParsers : InParser[];
    public constructor (inParsers : InParser[]) {
        super("");
        this.inParsers = inParsers;
    }

    public text (s : string) : TextNode {
        return new TextNode(s);
    }
    public isTextNode (node : Node) : node is TextNode {
        return node instanceof TextNode;
    }

    // Parse the next inline element in subject, advancing subject position.
    // On success, add the result to block's children and return true.
    // On failure, return false.
    public parseInline (parser : Parser, blockParser : BlockParser, block : Node) {
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
        block.appendChild(this.text(fromCodePoint(c)));
        //console.log("adding text", c, fromCodePoint(c));
        return true;
    };

    // Parse string content in block into inline children,
    public parse (parser : Parser, blockParser : BlockParser, block : Node) {
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
