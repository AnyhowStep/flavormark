"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//TODO Think of a better name for this, lol
class RegexStream {
    constructor(subject) {
        this.subject = subject;
        this.pos = 0;
    }
    // If re matches at current position in the subject, advance
    // position in subject and return the match; otherwise return undefined.
    match(re) {
        const m = re.exec(this.subject.slice(this.pos));
        if (m == undefined) {
            return undefined;
        }
        this.pos += m.index + m[0].length;
        return m[0];
    }
    ;
    hasCharacters() {
        return (this.pos >= 0 && this.pos < this.subject.length);
    }
    // Returns the code for the character at the current subject position, or -1
    // there are no more characters.
    peek() {
        return this.subject[this.pos];
    }
    // Parse zero or more space characters, including at most one newline
    spnl() {
        this.match(/^[ ]*(?:\n[ ]*)?/);
        return true;
    }
    ;
}
exports.RegexStream = RegexStream;
//# sourceMappingURL=RegexStream.js.map