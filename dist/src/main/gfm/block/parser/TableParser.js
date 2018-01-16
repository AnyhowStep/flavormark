"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const TableNode_1 = require("./../node/TableNode");
const VALID_CHARACTERS = "[\\-\\|\\:\\s]";
//Must have at least one - and one |
const reTableDelimiter = new RegExp("^" +
    "(" +
    VALID_CHARACTERS + "*" +
    "\\-" +
    VALID_CHARACTERS + "*" +
    "\\|" +
    VALID_CHARACTERS + "*" +
    ")" +
    "|" +
    "(" +
    VALID_CHARACTERS + "*" +
    "\\|" +
    VALID_CHARACTERS + "*" +
    "\\-" +
    VALID_CHARACTERS + "*" +
    ")" +
    "$");
function toColumns(str) {
    str = str.trim();
    //Remove leading and trailing pipes
    if (str.startsWith("|")) {
        str = str.substr(1);
    }
    if (/([^\\]\|$)|(^\|$)/.test(str)) {
        str = str.substr(0, str.length - 1);
    }
    //Split by unescaped pipes
    //This bloody ugly hand-written parsing thing makes me sick
    //It's probably buggy, too
    const parts = [];
    let escaped = false;
    let curPart = undefined;
    for (let i = 0; i < str.length; ++i) {
        if (str[i] == "\\") {
            escaped = true;
            if (curPart == undefined) {
                curPart = "\\";
            }
            else {
                curPart += "\\";
            }
        }
        else if (str[i] == "|") {
            if (escaped) {
                if (curPart == undefined) {
                    curPart = "|";
                }
                else {
                    curPart += "|";
                }
                escaped = false;
            }
            else {
                if (curPart != undefined) {
                    parts.push(curPart);
                    curPart = undefined;
                }
            }
        }
        else {
            escaped = false;
            if (curPart == undefined) {
                curPart = str[i];
            }
            else {
                curPart += str[i];
            }
        }
    }
    if (curPart != undefined) {
        parts.push(curPart);
        curPart = undefined;
    }
    return parts
        .map((s) => {
        return s.trim()
            .replace(/\\\|/g, "|");
    });
}
class TableParser extends BlockParser_1.BlockParser {
    constructor(args, nodeCtor = TableNode_1.TableNode) {
        super(nodeCtor);
        this.acceptsLines = false;
        this.parseInlines = false;
        this.isLeaf = true;
        this.acceptLazyContinuation = true;
        this.args = args;
    }
    tryStart(parser, node) {
        if (!parser.isParagraphNode(node)) {
            return false;
        }
        const line = parser.currentLine.slice(parser.nextNonspace);
        if (!reTableDelimiter.test(line)) {
            return false;
        }
        //Verify this delimiter is valid first
        const delimiters = toColumns(line);
        if (delimiters.some((d) => {
            return !/^\:?-+\:?$/.test(d);
        })) {
            //Found an invalid delimiter
            //console.log("invalid delimiter");
            return false;
        }
        const alignments = delimiters.map((d) => {
            d = d.trim();
            const left = d.startsWith(":");
            const right = d.endsWith(":");
            if (left && right) {
                return "center";
            }
            if (right) {
                return "right";
            }
            return "left";
        });
        let paragraphStr = parser.getParagraphString(node);
        if (paragraphStr.length == 0) {
            return false;
        }
        if (paragraphStr[paragraphStr.length - 1] == "\n") {
            paragraphStr = paragraphStr.substr(0, paragraphStr.length - 1);
        }
        const lastNewline = paragraphStr.lastIndexOf("\n", paragraphStr.length - 1);
        let lastLine = (lastNewline < 0) ?
            paragraphStr :
            paragraphStr.substr(lastNewline + 1);
        if (!/(^\|)|([^\\]\|)/.test(lastLine)) {
            return false;
        }
        const headers = toColumns(lastLine);
        if (alignments.length != headers.length) {
            return false;
        }
        parser.setParagraphString(node, (lastNewline < 0) ?
            "" :
            paragraphStr.substr(0, lastNewline + 1));
        const table = parser.addChild(this, parser.nextNonspace);
        table.headers = headers;
        table.alignments = alignments;
        if (lastNewline < 0) {
            node.unlink();
        }
        const thead = this.args.theadParser.instantiate(table.getSourceRangeOrError());
        table.appendChild(thead);
        const theadRow = this.args.trParser.instantiate(table.getSourceRangeOrError());
        thead.appendChild(theadRow);
        for (let i = 0; i < table.headers.length; ++i) {
            const a = table.alignments[i];
            const h = table.headers[i];
            const th = this.args.thParser.instantiate(table.getSourceRangeOrError());
            th.alignment = a;
            th.stringContent = h;
            theadRow.appendChild(th);
        }
        parser.advanceOffset(parser.currentLine.length);
        return true;
    }
    continue(_parser, _node) {
        return false;
    }
    lazyContinue(parser, node) {
        if (parser.blank) {
            parser.finalize(node, parser.lineNumber);
            return;
        }
        const line = parser.currentLine.slice(parser.nextNonspace);
        const row = toColumns(line);
        while (row.length < node.alignments.length) {
            row.push("");
        }
        while (row.length > node.alignments.length) {
            row.pop();
        }
        node.rows.push(row);
        if (node.tbody == undefined) {
            node.tbody = this.args.tbodyParser.instantiate(parser.getRangeStart(0));
            node.appendChild(node.tbody);
        }
        const tr = this.args.trParser.instantiate(parser.getRangeStart(0));
        node.tbody.appendChild(tr);
        for (let j = 0; j < row.length; ++j) {
            const a = node.alignments[j];
            const c = row[j];
            const td = this.args.tdParser.instantiate(parser.getRangeStart(0));
            td.alignment = a;
            td.stringContent = c;
            //parser.processInlines(td);
            tr.appendChild(td);
        }
    }
    finalize(_parser, _node) { }
    canContain() { return false; }
}
exports.TableParser = TableParser;
//# sourceMappingURL=TableParser.js.map