import {BlockParser, BlockNodeCtor} from "../BlockParser";
import {Parser} from "../Parser";
import {peek, isSpaceOrTab} from "../refactored/util";
import {BlockquoteNode} from "./block/node/BlockquoteNode";

var C_GREATERTHAN = 62;

export class BlockquoteParser extends BlockParser<BlockquoteNode> {
    public acceptsLines = false;

    public constructor (nodeType : string = "block_quote", nodeCtor : BlockNodeCtor<BlockquoteNode> = BlockquoteNode) {
        super(nodeType, nodeCtor);
    }

    public tryStart (parser : Parser) {
        if (parser.indented) {
            return false;
        }
        if (peek(parser.currentLine, parser.nextNonspace) != C_GREATERTHAN) {
            return false;
        }
        parser.advanceNextNonspace();
        parser.advanceOffset(1, false);
        // optional following space
        if (isSpaceOrTab(peek(parser.currentLine, parser.offset))) {
            parser.advanceOffset(1, true);
        }
        parser.closeUnmatchedBlocks();
        parser.addChild(this, parser.nextNonspace);
        return true;
    }
    public continue (parser : Parser) {
        if (parser.indented) {
            return false;
        }
        if (peek(parser.currentLine, parser.nextNonspace) != C_GREATERTHAN) {
            return false;
        }
        parser.advanceNextNonspace();
        parser.advanceOffset(1, false);
        if (isSpaceOrTab(peek(parser.currentLine, parser.offset))) {
            parser.advanceOffset(1, true);
        }
        return true;
    }
    public finalize () {}
    public canContain () { return true; }
    public ignoreLastLineBlank () {
        return true;
    }
}
