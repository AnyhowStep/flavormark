import {BlockParser, BlockNodeCtor} from "./../../../BlockParser";
import {Parser} from "./../../../Parser";
import {peek, isSpaceOrTab} from "./../../../refactored/util";
import {unescapeString} from "./../../../common";
import {FencedCodeBlockNode} from "./../node/FencedCodeBlockNode";

const reCodeFence = /^`{3,}(?!.*`)|^~{3,}(?!.*~)/;

const reClosingCodeFence = /^(?:`{3,}|~{3,})(?= *$)/;

export class FencedCodeBlockParser extends BlockParser<FencedCodeBlockNode> {
    public acceptsLines = true;
    public earlyExitOnEnd = true;
    public isLeaf = true;

    public constructor (nodeType : string = "fenced_code_block", nodeCtor : BlockNodeCtor<FencedCodeBlockNode> = FencedCodeBlockNode) {
        super(nodeType, nodeCtor);
    }

    public tryStart (parser : Parser) {
        if (parser.indented) {
            return false;
        }
        const match = parser.currentLine
            .slice(parser.nextNonspace)
            .match(reCodeFence);
        if (match == null) {
            return false;
        }
        const fenceLength = match[0].length;
        parser.closeUnmatchedBlocks();
        const fencedCodeBlock = parser.addChild<FencedCodeBlockNode>(this, parser.nextNonspace);
        fencedCodeBlock.fenceLength = fenceLength;
        fencedCodeBlock.fenceChar = match[0][0];
        fencedCodeBlock.fenceOffset = parser.indent;
        parser.advanceNextNonspace();
        parser.advanceOffset(fenceLength, false);
        return true;
    }
    public continue (parser : Parser, node : FencedCodeBlockNode) {
        var ln = parser.currentLine;
        let match : null|RegExpMatchArray = null;
        if (
            !parser.indented &&
            ln.charAt(parser.nextNonspace) === node.fenceChar
        ) {
            match = ln.slice(parser.nextNonspace).match(reClosingCodeFence);
        }

        if (match != undefined && match[0].length >= node.fenceLength) {
            // closing fence - we're at end of line, so we can return
            parser.finalize(node, parser.lineNumber);
            return false;
        }

        // skip optional spaces of fence offset
        for (let i=node.fenceOffset; i > 0 && isSpaceOrTab(peek(ln, parser.offset)); --i) {
            parser.advanceOffset(1, true);
        }
        return true;
    }
    public finalize (_parser : Parser, node : FencedCodeBlockNode) {
        // first line becomes info string
        const content = node.stringContent;
        if (content == undefined) {
            throw new Error("content cannot be undefined");
        }
        const newlinePos = content.indexOf('\n');
        const firstLine = content.slice(0, newlinePos);
        const rest = content.slice(newlinePos + 1);
        node.info = unescapeString(firstLine.trim());
        node.literal = rest;
    }
    public canContain () { return false; }
    public ignoreLastLineBlank () {
        return true;
    }
    public appendString (node : FencedCodeBlockNode, str : string) : void {
        if (node.stringContent == undefined) {
            node.stringContent = "";
        }
        node.stringContent += str;
    }
    public getString (node : FencedCodeBlockNode) : string {
        return node.stringContent || "";
    }
}
