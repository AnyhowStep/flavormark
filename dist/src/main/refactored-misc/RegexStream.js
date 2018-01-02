"use strict";
//TODO Think of a better name for this, lol
Object.defineProperty(exports, "__esModule", { value: true });
var reSpnl = /^ *(?:\n *)?/;
class RegexStream {
    constructor(subject) {
        this.subject = subject;
        this.pos = 0;
    }
    // If re matches at current position in the subject, advance
    // position in subject and return the match; otherwise return null.
    match(re) {
        var m = re.exec(this.subject.slice(this.pos));
        if (m == null) {
            return null;
        }
        else {
            this.pos += m.index + m[0].length;
            return m[0];
        }
    }
    ;
    hasCharacters() {
        return (this.pos >= 0 && this.pos < this.subject.length);
    }
    // Returns the code for the character at the current subject position, or -1
    // there are no more characters.
    peek() {
        if (this.hasCharacters()) {
            return this.subject.charCodeAt(this.pos);
        }
        else {
            return -1;
        }
    }
    ;
    peekChar() {
        if (this.hasCharacters()) {
            return this.subject.charAt(this.pos);
        }
        else {
            return -1;
        }
    }
    // Parse zero or more space characters, including at most one newline
    spnl() {
        this.match(reSpnl);
        return true;
    }
    ;
}
exports.RegexStream = RegexStream;
//# sourceMappingURL=RegexStream.js.map