import {Node} from "./node";

import {fromCodePoint} from "./from-code-point";
import {BlockParser} from "./refactored/BlockParser";
import {BlockNode} from "./refactored/BlockNode";
import {processEmphasis} from "./refactored-misc/emphasis";

// Constants for character codes:

var reSpnl = /^ *(?:\n *)?/;


import {InParser} from "./refactored-inline/InParser";
import {NewlineParser} from "./refactored-inline/NewlineParser";
import {BackslashParser} from "./refactored-inline/BackslashParser";
import {BacktickParser} from "./refactored-inline/BacktickParser";
import {DelimParser} from "./refactored-inline/DelimParser";
import {OpenBracketParser} from "./refactored-inline/OpenBracketParser";
import {BangParser} from "./refactored-inline/BangParser";
import {CloseBracketParser} from "./refactored-inline/CloseBracketParser";
import {AutolinkParser} from "./refactored-inline/AutolinkParser";
import {HtmlTagParser} from "./refactored-inline/HtmlTagParser";
import {LessThanLiteralParser} from "./refactored-inline/LessThanLiteralParser";
import {EntityParser} from "./refactored-inline/EntityParser";
import {StringParser} from "./refactored-inline/StringParser";
const inParsers : InParser[] = [
    new NewlineParser(),
    new BackslashParser(),
    new BacktickParser(),
    new DelimParser(),
    new OpenBracketParser(),
    new BangParser(),
    new CloseBracketParser(),
    new AutolinkParser(),
    new HtmlTagParser(),
    new LessThanLiteralParser(),
    new EntityParser(),

    new StringParser(), //Should this be a default parser that cannot be removed?
];

function text(s : string) {
    var node = new Node('text');
    node.literal = s;
    return node;
};
import {DelimiterCollection} from "./refactored-misc/DelimiterCollection";
import {BracketCollection} from "./refactored-misc/BracketCollection";

export interface Options {
    smart? : boolean
}

export type RefMap = {
    [k : string] : undefined|{ destination: string, title: string }
}

export class InlineParser {
    subject : string = '';
    delimiters = new DelimiterCollection();
    brackets = new BracketCollection(this.delimiters);
    pos = 0;
    refmap : RefMap = {};
    options : Options;
    constructor (options : undefined|Options) {
        this.options = options || {};
    }

    // INLINE PARSER

    // These are methods of an InlineParser object, defined below.
    // An InlineParser keeps track of a subject (a string to be
    // parsed) and a position in that subject.

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

    text (s : string) {
        return text(s);
    }

    // Parse zero or more space characters, including at most one newline
    spnl() {
        this.match(reSpnl);
        return true;
    };


    // Parse the next inline element in subject, advancing subject position.
    // On success, add the result to block's children and return true.
    // On failure, return false.
    parseInline (block : BlockNode) {
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
        block.appendChild(text(fromCodePoint(c)));
        return true;
    };

    // Parse string content in block into inline children,
    // using refmap to resolve references.
    parse (blockParser : BlockParser, block : BlockNode) {
        this.subject = (blockParser.getString(block)).trim();
        this.pos = 0;
        this.delimiters = new DelimiterCollection();
        this.brackets = new BracketCollection(this.delimiters);
        while (this.parseInline(block)) {
        }
        blockParser.unsetString(block); // allow raw string to be garbage collected
        processEmphasis(this.delimiters, null);
    }
}
