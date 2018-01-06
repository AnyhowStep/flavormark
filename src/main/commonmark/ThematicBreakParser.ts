import {BlockParser, BlockNodeCtor} from "../BlockParser";
import {Parser} from "../Parser";
import {Node} from "../Node";

const reThematicBreak = /^(?:(?:\*[ \t]*){3,}|(?:_[ \t]*){3,}|(?:-[ \t]*){3,})[ \t]*$/;

export class ThematicBreakParser extends BlockParser {
    public acceptsLines = false;
    public isLeaf = true;

    public constructor (nodeType : string = "thematic_break", nodeCtor : BlockNodeCtor<Node> = Node) {
        super(nodeType, nodeCtor);
    }

    public tryStart (parser : Parser) {
        if (
            !parser.indented &&
            reThematicBreak.test(parser.currentLine.slice(parser.nextNonspace))
        ) {
            parser.closeUnmatchedBlocks();
            parser.addChild(this, parser.nextNonspace);
            parser.advanceOffset(parser.currentLine.length - parser.offset, false);
            return true;
        } else {
            return false;
        }
    }
    public continue () : boolean {
        // a thematic break can never container > 1 line, so fail to match:
        return false;
    };
    public finalize () {}
    public canContain () { return false; }
}
