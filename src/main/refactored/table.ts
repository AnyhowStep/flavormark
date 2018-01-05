import {Parser} from "../Parser";
import {BlockParser} from "../BlockParser";
import {TableNode, Tr, Th, Td, Thead, Tbody} from "./TableNode";
import {Node} from "../Node";

const VALID_CHARACTERS = "[\\-\\|\\:\\s]";
//Must have at least one - and one |
var reTableDelimiter = new RegExp(
    "^" +
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
    "$"
);

function toColumns (str : string) {
    str = str.trim();
    //Remove leading and trailing pipes
    if (str.startsWith("|")) {
        str = str.substr(1);
    }
    if (/([^\\]\|$)|(^\|$)/.test(str)) {
        str = str.substr(0, str.length-1);
    }
    //Split by unescaped pipes
    return str.split(/[^\\]\|/)
        .map((s) => {
            return s.trim()
                //Unescape all escaped pipes
                .replace(/\\\|/g, "|");
        });
}

export class TableParser extends BlockParser<TableNode> {
    tryStart=(parser : Parser, container : Node) => {
        if (
            parser.isParagraphNode(container) &&
            reTableDelimiter.test(parser.currentLine)
        ) {
            //Verify this delimiter is valid first
            const delimiters = toColumns(parser.currentLine);
            if (delimiters.some((d) => {
                return !/^\:?-+\:?$/.test(d);
            })) {
                //Found an invalid delimiter
                return false;
            }
            const alignments = delimiters.map((d) => {
                const left  = d.startsWith(":");
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
            if (paragraphStr[paragraphStr.length-1] == "\n") {
                paragraphStr = paragraphStr.substr(0, paragraphStr.length-1);
            }
            const lastNewline = paragraphStr.lastIndexOf("\n", paragraphStr.length-1);

            let lastLine = (lastNewline < 0) ?
                paragraphStr :
                paragraphStr.substr(lastNewline+1);
            if (!/(^\|)|([^\\]\|)/.test(lastLine)) {
                return false;
            }
            const headers = toColumns(lastLine);

            if (alignments.length != headers.length) {
                return false;
            }
            parser.setParagraphString(
                container,
                (lastNewline < 0) ?
                    "" :
                    paragraphStr.substr(0, lastNewline+1)
            );
            //console.log("last line:", lastLine);
            //console.log("paragraph:", parser.getParagraphString(container));
            //Build headers from lastLine


            //parser.advanceNextNonspace();
            //parser.advanceOffset(match[0].length, false);
            //parser.closeUnmatchedBlocks();
            const table : TableNode = parser.addChild<TableNode>(this, parser.nextNonspace);
            table.headers = headers;
            table.alignments = alignments;
            if (lastNewline < 0) {
                container.unlink();
            }

            const thead = new Thead("thead");
            table.appendChild(thead);

            const theadRow = new Tr("tr");
            thead.appendChild(theadRow);
            for (let i=0; i<table.headers.length; ++i) {
                const a = table.alignments[i];
                const h = table.headers[i];
                const th = new Th("th");
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
        } else {
            return false;
        }
    };
    continue=(_parser : Parser, _node : TableNode) : boolean => {
        return false;
    };
    lazyContinue = (parser : Parser, node : TableNode) => {
        const lastLine = parser.currentLine;
        if (parser.blank) {
            return false;
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
            node.tbody = new Tbody("tbody");
            node.appendChild(node.tbody);
        }

        const tr = new Tr("tr");
        node.tbody.appendChild(tr);
        for (let j=0; j<row.length; ++j) {
            const a = node.alignments[j];
            const c = row[j];
            const td = new Td("td");
            td.alignment = a;
            td.string_content = c;
            //parser.processInlines(td);
            tr.appendChild(td);
        }
        return true;
    };
    finalize = (_parser : Parser, _node : TableNode)=> {

    };
    canContain= () =>{ return false; };
    acceptsLines= false;
    parseInlines = false;
    isLeaf = true;
    acceptLazyContinuation = true;
}

export const tableParser = new TableParser("table", TableNode);

export class ThParser extends BlockParser<Th> {
    public constructor () {
        super("th", Th);
    }
    public getString (node : Th) : string {
        return node.string_content;
    }
    parseInlines = true;
}

export class TdParser extends BlockParser<Td> {
    public constructor () {
        super("td", Td);
    }
    public getString (node : Td) : string {
        return node.string_content;
    }
    parseInlines = true;
}

export class TrParser extends BlockParser<Tr> {
    public constructor () {
        super("tr", Tr);
    }
}
export class TheadParser extends BlockParser<Thead> {
    public constructor () {
        super("thead", Thead);
    }
}
export class TbodyParser extends BlockParser<Tbody> {
    public constructor () {
        super("tbody", Thead);
    }
    continue=(_parser : Parser, _node : Tbody) : boolean => {
        return false;
    }
}
