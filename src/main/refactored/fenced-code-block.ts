import {BlockParser} from "./BlockParser";
import {Parser} from "../blocks";
import {Node} from "../node";
import {peek, isSpaceOrTab} from "./util";
import {unescapeString} from "../common";
import {BlockNode} from "./BlockNode";

var reCodeFence = /^`{3,}(?!.*`)|^~{3,}(?!.*~)/;

var reClosingCodeFence = /^(?:`{3,}|~{3,})(?= *$)/;

export class FencedCodeBlockParser extends BlockParser<BlockNode> {
    tryStart= (parser : Parser) => {
        var match;
        if (!parser.indented &&
            (match = parser.currentLine.slice(parser.nextNonspace).match(reCodeFence))) {
            var fenceLength = match[0].length;
            parser.closeUnmatchedBlocks();
            var container = parser.addChild(this, parser.nextNonspace);
            container.fenceLength = fenceLength;
            container.fenceChar = match[0][0];
            container.fenceOffset = parser.indent;
            parser.advanceNextNonspace();
            parser.advanceOffset(fenceLength, false);
            return true;
        } else {
            return false;
        }
    };
    continue= (parser : Parser, container : Node)=>  {
        var ln = parser.currentLine;
        var indent = parser.indent;
        var match = (indent <= 3 &&
            ln.charAt(parser.nextNonspace) === container.fenceChar &&
            ln.slice(parser.nextNonspace).match(reClosingCodeFence));
        if (match && match[0].length >= container.fenceLength) {
            // closing fence - we're at end of line, so we can return
            parser.finalize(container, parser.lineNumber);
            return false;
        } else {
            // skip optional spaces of fence offset
            var i = container.fenceOffset;
            if (i == null) {
                throw new Error("i cannot be null")
            }
            while (i > 0 && isSpaceOrTab(peek(ln, parser.offset))) {
                parser.advanceOffset(1, true);
                i--;
            }
        }
        return true;
    };
    finalize= (_parser : Parser, block : Node)=>  {
        // first line becomes info string
        var content = block.string_content;
        if (content == null) {
            throw new Error("content cannot be null");
        }
        var newlinePos = content.indexOf('\n');
        var firstLine = content.slice(0, newlinePos);
        var rest = content.slice(newlinePos + 1);
        block.info = unescapeString(firstLine.trim());
        block.literal = rest;
        block.string_content = null; // allow GC
    };
    canContain= () => { return false; };
    acceptsLines = true;
    earlyExitOnEnd = true;
    ignoreLastLineBlank = (_parser : Parser, _container : Node) => { return true; };
    isLeaf = true;
    public appendString (node : BlockNode, str : string) : void {
        if (node.string_content == null) {
            node.string_content = "";
        }
        node.string_content += str;
    }
    public getString (node : BlockNode) : string {
        return node.string_content || "";
    }
    // allow raw string to be garbage collected
    public unsetString (node : BlockNode) : void {
        node.string_content = null;
    }
}

export const fencedCodeBlockParser = new FencedCodeBlockParser("fenced_code_block", BlockNode);
