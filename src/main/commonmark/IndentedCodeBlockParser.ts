import {BlockParser, BlockNodeCtor} from "../BlockParser";
import {Parser} from "../Parser";
import {INDENT_LENGTH} from "../Constants";
import {IndentedCodeBlockNode} from "./IndentedCodeBlockNode";

export class IndentedCodeBlockParser extends BlockParser<IndentedCodeBlockNode> {
    public acceptsLines = true;
    public isLeaf = true;

    public constructor (nodeType : string = "indented_code_block", nodeCtor : BlockNodeCtor<IndentedCodeBlockNode> = IndentedCodeBlockNode) {
        super(nodeType, nodeCtor);
    }

    public tryStart (parser : Parser) {
        if (!parser.indented) {
            return false;
        }
        if (parser.blank) {
            return false;
        }
        if (parser.tip == undefined || parser.isParagraphNode(parser.tip)) {
            return false;
        }
        parser.advanceOffset(INDENT_LENGTH, true);
        parser.closeUnmatchedBlocks();
        parser.addChild(this, parser.offset);
        return true;
    }
    public continue (parser : Parser) {
        const indent = parser.indent;
        if (indent >= INDENT_LENGTH) {
            parser.advanceOffset(INDENT_LENGTH, true);
            return true;
        } else if (parser.blank) {
            parser.advanceNextNonspace();
            return true;
        } else {
            return false;
        }
    }
    public finalize (_parser : Parser, block : IndentedCodeBlockNode) {
        block.literal = block.stringContent.replace(/(\n *)+$/, '\n');
    }
    public canContain () { return false; }

    public appendString (node : IndentedCodeBlockNode, str : string) : void {
        if (node.stringContent == undefined) {
            node.stringContent = "";
        }
        node.stringContent += str;
    }
    public getString (node : IndentedCodeBlockNode) : string {
        return node.stringContent;
    }
}

export const indentedCodeBlockParser = new IndentedCodeBlockParser("indented_code_block", IndentedCodeBlockNode);
