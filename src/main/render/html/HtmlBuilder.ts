export class HtmlBuilder {
    private buffer : string = "";
    public toString () {
        return this.buffer;
    }
    public appendOne (str : string) : this {
        if (str.length == 0) {
            return this;
        }
        this.buffer += str;
        return this;
    }
    public append (...arr : string[]) : this {
        for (let str of arr) {
            this.appendOne(str);
        }
        return this;
    }
    public tag (name : string, attrs? : [string, string][], selfClosing? : boolean) : this {
        this.append("<", name);
        if (attrs != undefined) {
            for (let attrib of attrs) {
                this.append(" ", attrib[0], "=", attrib[1]);
            }
        }
        if (selfClosing) {
            this.append(" /");
        }
        this.append(">");
        return this;
    }
    public nl () : this {
        if (this.buffer.length == 0 || this.buffer[this.buffer.length-1] == "\n") {
            return this;
        }
        this.append("\n");
        return this;
    }
}
