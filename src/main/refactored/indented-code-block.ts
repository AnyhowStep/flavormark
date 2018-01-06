import {BlockParser} from "../BlockParser";
import {Parser} from "../Parser";
//import {Node} from "../Node";
import {INDENT_LENGTH} from "../Constants";
import {IndentedCodeBlockNode} from "./IndentedCodeBlockNode";

export class IndentedCodeBlockParser extends BlockParser<IndentedCodeBlockNode> {
    tryStart (parser : Parser) {
        if (parser.indented &&
            parser.tip != undefined &&
            !parser.isParagraphNode(parser.tip) &&
            !parser.blank) {
            // indented code
            parser.advanceOffset(INDENT_LENGTH, true);
            parser.closeUnmatchedBlocks();
            parser.addChild(this, parser.offset);
            return true;
        } else {
            return false;
        }
    };
    continue (parser : Parser) {
        var indent = parser.indent;
        if (indent >= INDENT_LENGTH) {
            parser.advanceOffset(INDENT_LENGTH, true);
        } else if (parser.blank) {
            parser.advanceNextNonspace();
        } else {
            return false;
        }
        return true;
    }
    finalize (_parser : Parser, block : IndentedCodeBlockNode) {
        if (block.string_content == undefined) {
            throw new Error("block.string_content cannot be undefined")
        }
        block.literal = block.string_content.replace(/(\n *)+$/, '\n');
        block.string_content = undefined; // allow GC
    };
    canContain () { return false; }
    acceptsLines= true;
    isLeaf = true;
    public appendString (node : IndentedCodeBlockNode, str : string) : void {
        if (node.string_content == undefined) {
            node.string_content = "";
        }
        node.string_content += str;
    }
    public getString (node : IndentedCodeBlockNode) : string {
        return node.string_content || "";
    }
    // allow raw string to be garbage collected
    public unsetString (node : IndentedCodeBlockNode) : void {
        node.string_content = undefined;
    }
}

export const indentedCodeBlockParser = new IndentedCodeBlockParser("indented_code_block", IndentedCodeBlockNode);
