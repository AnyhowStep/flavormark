import {Parser} from "./../../../Parser";
import {BlockParser, BlockNodeCtor} from "./../../../BlockParser";
import {TableNode} from "./../node/TableNode";
import {Node} from "./../../../Node";
import {TbodyParser} from "./TbodyParser";
import {TdParser} from "./TdParser";
import {TheadParser} from "./TheadParser";
import {ThParser} from "./ThParser";
import {TrParser} from "./TrParser";

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

export interface TableParserArgs {
    tbodyParser : TbodyParser,
    tdParser : TdParser,
    theadParser : TheadParser,
    thParser : ThParser,
    trParser : TrParser,
}

export class TableParser extends BlockParser<TableNode> {
    public acceptsLines = false;
    public parseInlines = false;
    public isLeaf = true;
    public acceptLazyContinuation = true;

    private args : TableParserArgs;
    public constructor (args : TableParserArgs, nodeType : string = "table", nodeCtor : BlockNodeCtor<TableNode> = TableNode) {
        super(nodeType, nodeCtor);
        this.args = args;
    }

    public tryStart (parser : Parser, container : Node) {
        if (!parser.isParagraphNode(container)) {
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
        const table : TableNode = parser.addChild<TableNode>(this, parser.nextNonspace);
        table.headers = headers;
        table.alignments = alignments;
        if (lastNewline < 0) {
            container.unlink();
        }

        const thead = this.args.theadParser.instantiate(table.getSourceRangeOrError());
        table.appendChild(thead);

        const theadRow = this.args.trParser.instantiate(table.getSourceRangeOrError());
        thead.appendChild(theadRow);
        for (let i=0; i<table.headers.length; ++i) {
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
    public continue (_parser : Parser, _node : TableNode) : boolean {
        return false;
    }
    public lazyContinue (parser : Parser, node : TableNode) : void {
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
        for (let j=0; j<row.length; ++j) {
            const a = node.alignments[j];
            const c = row[j];
            const td = this.args.tdParser.instantiate(parser.getRangeStart(0));
            td.alignment = a;
            td.stringContent = c;
            //parser.processInlines(td);
            tr.appendChild(td);
        }
    }
    public finalize (_parser : Parser, _node : TableNode) {}
    public canContain () { return false; }
}
