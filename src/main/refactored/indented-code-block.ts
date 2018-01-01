import {BlockParser} from "./BlockParser";
import {Parser} from "../blocks";
import {Node} from "../node";
import {CODE_INDENT} from "./util";

export class IndentedCodeBlockParser extends BlockParser {
    tryStart= (parser : Parser) => {
        if (parser.indented &&
            parser.tip != null &&
            parser.tip.type !== 'paragraph' &&
            !parser.blank) {
            // indented code
            parser.advanceOffset(CODE_INDENT, true);
            parser.closeUnmatchedBlocks();
            parser.addChild('indented_code_block', parser.offset);
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

export const indentedCodeBlockParser = new IndentedCodeBlockParser("indented_code_block");
