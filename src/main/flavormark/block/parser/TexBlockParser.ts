import {BlockParser, BlockNodeCtor} from "./../../../BlockParser";
import {Parser} from "./../../../Parser";
import {isSpaceOrTab} from "./../../../commonmark/string-util";
import {TexBlockNode} from "./../node/TexBlockNode";

const reCodeFence = /^\${2,}(?!.*`)/;

const reClosingCodeFence = /^(?:\${2,})(?= *$)/;

export class TexBlockParser extends BlockParser<TexBlockNode> {
    public acceptsLines = true;
    public earlyExitOnEnd = true;
    public isLeaf = true;

    public constructor (nodeCtor : BlockNodeCtor<TexBlockNode> = TexBlockNode) {
        super(nodeCtor);
    }

    public tryStart (parser : Parser) {
        if (parser.indented) {
            return false;
        }
        const match = parser.currentLine
            .slice(parser.nextNonspace)
            .match(reCodeFence);
        if (match == undefined) {
            return false;
        }
        const fenceLength = match[0].length;
        parser.closeUnmatchedBlocks();
        const texBlock = parser.addChild<TexBlockNode>(this, parser.nextNonspace);
        texBlock.fenceLength = fenceLength;
        texBlock.fenceChar = match[0][0];
        texBlock.fenceOffset = parser.indent;
        parser.advanceNextNonspace();
        parser.advanceOffset(fenceLength, false);

        const sameLineEndMatch = parser.currentLine.slice(parser.offset).match(/(\${2,})\s*$/);
        if (sameLineEndMatch != undefined) {
            if (sameLineEndMatch[1].length == fenceLength) {
                if (sameLineEndMatch.index == undefined) {
                    throw new Error("index cannot be undefined")
                }
                //End now
                texBlock.oneLine = true;
                texBlock.stringContent = parser.currentLine.slice(
                    parser.offset,
                    parser.offset + sameLineEndMatch.index
                );
                parser.advanceOffset(parser.currentLine.length-parser.offset, false);
                parser.finalize(texBlock, parser.lineNumber);
            }
        }
        return true;
    }
    public continue (parser : Parser, node : TexBlockNode) {
        if (node.oneLine) {
            return false;
        }
        const ln = parser.currentLine;
        let match : null|RegExpMatchArray = null;
        if (
            !parser.indented &&
            ln.charAt(parser.nextNonspace) === node.fenceChar
        ) {
            match = ln.slice(parser.nextNonspace).match(reClosingCodeFence);
        }

        if (match != undefined && match[0].length >= node.fenceLength) {
            parser.finalize(node, parser.lineNumber);
            return false;
        }

        for (let i=node.fenceOffset; i > 0 && isSpaceOrTab(ln[parser.offset]); --i) {
            parser.advanceOffset(1, true);
        }
        return true;
    }
    public finalize (_parser : Parser, node : TexBlockNode) {
        let content = node.stringContent;
        if (content == undefined) {
            throw new Error("content cannot be undefined");
        }
        content = content.replace(/^\$/, "\\$");
        while (/[^\\]\$/.test(content)) {
            content = content.replace(/([^\\])\$/, "$1\\$");
        }

        node.literal = content;
    }
    public canContain () { return false; }
    public ignoreLastLineBlank () {
        return true;
    }
    public appendString (node : TexBlockNode, str : string) : void {
        node.stringContent += str;
    }
    public getString (node : TexBlockNode) : string {
        return node.stringContent;
    }
}
