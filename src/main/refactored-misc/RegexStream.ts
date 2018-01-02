//TODO Think of a better name for this, lol

var reSpnl = /^ *(?:\n *)?/;

export class RegexStream {
    public subject : string;
    public pos : number;
    public constructor (subject : string) {
        this.subject = subject;
        this.pos = 0;
    }

    // If re matches at current position in the subject, advance
    // position in subject and return the match; otherwise return null.
    public match (re : RegExp) : string|null {
        var m = re.exec(this.subject.slice(this.pos));
        if (m == null) {
            return null;
        } else {
            this.pos += m.index + m[0].length;
            return m[0];
        }
    };

    public hasCharacters () {
        return (this.pos >= 0 && this.pos <= this.subject.length);
    }

    // Returns the code for the character at the current subject position, or -1
    // there are no more characters.
    public peek() {
        if (this.hasCharacters()) {
            return this.subject.charCodeAt(this.pos);
        } else {
            return -1;
        }
    };
    public peekChar () {
        if (this.hasCharacters()) {
            return this.subject.charAt(this.pos);
        } else {
            return -1;
        }
    }

    // Parse zero or more space characters, including at most one newline
    public spnl() {
        this.match(reSpnl);
        return true;
    };
}
