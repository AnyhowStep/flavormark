"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("../BlockParser");
const TableNode_1 = require("./TableNode");
const VALID_CHARACTERS = "[\\-\\|\\:\\s]";
//Must have at least one - and one |
var reTableDelimiter = new RegExp("^" +
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
    return str.split(/[^\\]\|/)
        .map((s) => {
        return s.trim()
            .replace(/\\\|/g, "|");
    });
}
class TableParser extends BlockParser_1.BlockParser {
    constructor() {
        super(...arguments);
        this.tryStart = (parser, container) => {
            if (parser.isParagraphNode(container) &&
                reTableDelimiter.test(parser.currentLine)) {
                //Verify this delimiter is valid first
                const delimiters = toColumns(parser.currentLine);
                if (delimiters.some((d) => {
                    return !/^\:?-+\:?$/.test(d);
                })) {
                    //Found an invalid delimiter
                    return false;
                }
                const alignments = delimiters.map((d) => {
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
                let paragraphStr = parser.getParagraphString(container);
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
                parser.setParagraphString(container, (lastNewline < 0) ?
                    "" :
                    paragraphStr.substr(0, lastNewline + 1));
                //console.log("last line:", lastLine);
                //console.log("paragraph:", parser.getParagraphString(container));
                //Build headers from lastLine
                //parser.advanceNextNonspace();
                //parser.advanceOffset(match[0].length, false);
                //parser.closeUnmatchedBlocks();
                const table = parser.addChild(this, parser.nextNonspace);
                table.headers = headers;
                table.alignments = alignments;
                if (lastNewline < 0) {
                    container.unlink();
                }
                const thead = new TableNode_1.Thead("thead");
                table.appendChild(thead);
                const theadRow = new TableNode_1.Tr("tr");
                thead.appendChild(theadRow);
                for (let i = 0; i < table.headers.length; ++i) {
                    const a = table.alignments[i];
                    const h = table.headers[i];
                    const th = new TableNode_1.Th("th");
                    th.alignment = a;
                    th.string_content = h;
                    //parser.processInlines(th);
                    theadRow.appendChild(th);
                }
                //console.log(container);
                //container.level = match[0].trim().length; // number of #s
                // remove trailing ###s:
                parser.advanceOffset(parser.currentLine.length);
                return true;
            }
            else {
                return false;
            }
        };
        this.finalize = (_parser, _node) => {
        };
        this.canContain = () => { return false; };
        this.acceptsLines = false;
        this.parseInlines = false;
        this.isLeaf = true;
        this.acceptLazyContinuation = true;
    }
    continue(_parser, _node) {
        return false;
    }
    lazyContinue(parser, node) {
        const lastLine = parser.currentLine;
        if (parser.blank) {
            parser.finalize(node, parser.lineNumber);
            return;
        }
        /*if (!/(^\|)|([^\\]\|)/.test(lastLine)) {
            return false;
        }*/
        //parser.advanceOffset(parser.currentLine.length);
        const row = toColumns(lastLine);
        while (row.length < node.alignments.length) {
            row.push("");
        }
        while (row.length > node.alignments.length) {
            row.pop();
        }
        node.rows.push(row);
        if (node.tbody == null) {
            node.tbody = new TableNode_1.Tbody("tbody");
            node.appendChild(node.tbody);
        }
        const tr = new TableNode_1.Tr("tr");
        node.tbody.appendChild(tr);
        for (let j = 0; j < row.length; ++j) {
            const a = node.alignments[j];
            const c = row[j];
            const td = new TableNode_1.Td("td");
            td.alignment = a;
            td.string_content = c;
            //parser.processInlines(td);
            tr.appendChild(td);
        }
    }
    ;
}
exports.TableParser = TableParser;
exports.tableParser = new TableParser("table", TableNode_1.TableNode);
class ThParser extends BlockParser_1.BlockParser {
    constructor() {
        super("th", TableNode_1.Th);
        this.parseInlines = true;
    }
    getString(node) {
        return node.string_content;
    }
    continue(_parser, _node) {
        return false;
    }
}
exports.ThParser = ThParser;
class TdParser extends BlockParser_1.BlockParser {
    constructor() {
        super("td", TableNode_1.Td);
        this.parseInlines = true;
    }
    getString(node) {
        return node.string_content;
    }
    continue(_parser, _node) {
        return false;
    }
}
exports.TdParser = TdParser;
class TrParser extends BlockParser_1.BlockParser {
    constructor() {
        super("tr", TableNode_1.Tr);
    }
    continue(_parser, _node) {
        return false;
    }
}
exports.TrParser = TrParser;
class TheadParser extends BlockParser_1.BlockParser {
    constructor() {
        super("thead", TableNode_1.Thead);
    }
    continue(_parser, _node) {
        return false;
    }
}
exports.TheadParser = TheadParser;
class TbodyParser extends BlockParser_1.BlockParser {
    constructor() {
        super("tbody", TableNode_1.Thead);
    }
    continue(_parser, _node) {
        return false;
    }
}
exports.TbodyParser = TbodyParser;
//# sourceMappingURL=table.js.map