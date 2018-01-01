import {BlockParser} from "./BlockParser";
import {Parser} from "../blocks";
import {Node} from "../node";
import {CODE_INDENT} from "./util";
import {BlockNode} from "./BlockNode";

export class IndentedCodeBlockParser extends BlockParser {
    tryStart= (parser : Parser) => {
        if (parser.indented &&
            parser.tip != null &&
            !parser.isParagraphNode(parser.tip) &&
            !parser.blank) {
            // indented code
            parser.advanceOffset(CODE_INDENT, true);
            parser.closeUnmatchedBlocks();
            parser.addChild(this, parser.offset);
            return true;
        } else {
            return false;
        }
    };
    continue= (parser : Parser) => {
        var indent = parser.indent;
        if (indent >= CODE_INDENT) {
            parser.advanceOffset(CODE_INDENT, true);
        } else if (parser.blank) {
            parser.advanceNextNonspace();
        } else {
            return false;
        }
        return true;
    };
    finalize= (_parser : Parser, block : Node) => {
        if (block.string_content == null) {
            throw new Error("block.string_content cannot be null")
        }
        block.literal = block.string_content.replace(/(\n *)+$/, '\n');
        block.string_content = null; // allow GC
    };
    canContain= () => { return false; };
    acceptsLines= true;
    isLeaf = true;
}

export const indentedCodeBlockParser = new IndentedCodeBlockParser("indented_code_block", BlockNode);
