import {BlockParser} from "./BlockParser";
import {Parser} from "../blocks";
import {Node} from "../node";
import {peek, isSpaceOrTab, CODE_INDENT} from "./util";
import {unescapeString} from "../common";


var reClosingCodeFence = /^(?:`{3,}|~{3,})(?= *$)/;


export const codeBlockParser : BlockParser = {
    continue: function(parser : Parser, container : Node) {
        var ln = parser.currentLine;
        var indent = parser.indent;
        if (container.isFenced) { // fenced
            var match = (indent <= 3 &&
                ln.charAt(parser.nextNonspace) === container.fenceChar &&
                ln.slice(parser.nextNonspace).match(reClosingCodeFence));
            if (match && match[0].length >= container.fenceLength) {
                // closing fence - we're at end of line, so we can return
                parser.finalize(container, parser.lineNumber);
                return 2;
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
        } else { // indented
            if (indent >= CODE_INDENT) {
                parser.advanceOffset(CODE_INDENT, true);
            } else if (parser.blank) {
                parser.advanceNextNonspace();
            } else {
                return 1;
            }
        }
        return 0;
    },
    finalize: function(_parser : Parser, block : Node) {
        if (block.isFenced) { // fenced
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
        } else { // indented
            if (block.string_content == null) {
                throw new Error("block.string_content cannot be null")
            }
            block.literal = block.string_content.replace(/(\n *)+$/, '\n');
        }
        block.string_content = null; // allow GC
    },
    canContain: function() { return false; },
    acceptsLines: true,
};
