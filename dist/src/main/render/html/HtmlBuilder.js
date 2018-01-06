"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HtmlBuilder {
    constructor() {
        this.buffer = "";
    }
    toString() {
        return this.buffer;
    }
    appendOne(str) {
        if (str.length == 0) {
            return this;
        }
        this.buffer += str;
        return this;
    }
    append(...arr) {
        for (let str of arr) {
            this.appendOne(str);
        }
        return this;
    }
    tag(name, attrs, selfClosing) {
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
    nl() {
        if (this.buffer.length == 0 || this.buffer[this.buffer.length - 1] == "\n") {
            return this;
        }
        this.append("\n");
        return this;
    }
}
exports.HtmlBuilder = HtmlBuilder;
//# sourceMappingURL=HtmlBuilder.js.map