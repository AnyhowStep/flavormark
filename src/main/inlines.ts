import {InlineNode} from "./refactored-inline/InlineNode";
import {TextNode} from "./refactored-inline/TextNode";

import {fromCodePoint} from "./from-code-point";
import {BlockParser} from "./refactored/BlockParser";
import {BlockNode} from "./refactored/BlockNode";

// Constants for character codes:

var reSpnl = /^ *(?:\n *)?/;

import {InParser} from "./refactored-inline/InParser";

export interface Options {
}

// INLINE PARSER

// These are methods of an InlineParser object, defined below.
// An InlineParser keeps track of a subject (a string to be
// parsed) and a position in that subject.
export class InlineParser {
    subject : string = '';
    pos = 0;
    options : Options;
    constructor (options : undefined|Options) {
        this.options = options || {};
    }

    // If re matches at current position in the subject, advance
    // position in subject and return the match; otherwise return null.
    match(re : RegExp) {
        var m = re.exec(this.subject.slice(this.pos));
        if (m === null) {
            return null;
        } else {
            this.pos += m.index + m[0].length;
            return m[0];
        }
    };

    // Returns the code for the character at the current subject position, or -1
    // there are no more characters.
    peek() {
        if (this.pos < this.subject.length) {
            return this.subject.charCodeAt(this.pos);
        } else {
            return -1;
        }
    };

    text (s : string) : InlineNode {
        return new TextNode(s);
    }

    // Parse zero or more space characters, including at most one newline
    spnl() {
        this.match(reSpnl);
        return true;
    };


    // Parse the next inline element in subject, advancing subject position.
    // On success, add the result to block's children and return true.
    // On failure, return false.
    parseInline (block : BlockNode, inParsers : InParser[]) {
        var c = this.peek();
        if (c === -1) {
            return false;
        }
        for (let p of inParsers) {
            if (p.parse(this, block)) {
                return true;
            }
        }
        this.pos += 1;
        block.appendChild(this.text(fromCodePoint(c)));
        return true;
    };

    // Parse string content in block into inline children,
    parse (blockParser : BlockParser, block : BlockNode, inParsers : InParser[]) {
        for (let i of inParsers) {
            i.reinit();
        }
        this.subject = (blockParser.getString(block)).trim();
        this.pos = 0;
        while (this.parseInline(block, inParsers)) {
        }
        blockParser.unsetString(block); // allow raw string to be garbage collected
        for (let i of inParsers) {
            i.finalize();
        }
    }
}
