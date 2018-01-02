import {BlockParser, BlockNodeCtor} from "./BlockParser";
import {Parser} from "../blocks";
import {Node} from "../node";
import {peek, isBlank} from "./util";
import {BlockNode} from "./BlockNode";
import {parseReference} from "../refactored-misc/util";
import {RefMap} from "../refactored-misc/RefMap";

var C_OPEN_BRACKET = 91;

export class ParagraphParser extends BlockParser<BlockNode> {
    private refMap : RefMap;
    public constructor (nodeType : string, nodeCtor : BlockNodeCtor<BlockNode>, refMap : RefMap) {
        super(nodeType, nodeCtor);
        this.refMap = refMap;
    }
    public reinit () {
        for (let k of Object.keys(this.refMap)) {
            delete this.refMap[k];
        }
    }
    continue= (parser : Parser) =>{
        return (parser.blank ? false : true);
    };
    finalize= (_parser : Parser, block : Node) =>{
        var pos;
        var hasReferenceDefs = false;

        // try parsing the beginning as link reference definitions:
        while (peek(block.string_content, 0) === C_OPEN_BRACKET &&
               (pos =
                parseReference(block.string_content, this.refMap))) {
           if (block.string_content== null) {
               throw new Error("block.string_content cannot be null");
           }
            block.string_content = block.string_content.slice(pos);
            hasReferenceDefs = true;
        }
        if (hasReferenceDefs && isBlank(block.string_content)) {
            block.unlink();
        }
    };
    canContain= () =>{ return false; };
    acceptsLines= true;
    parseInlines = true;
    acceptLazyContinuation = true;
    isLeaf = true;
    isParagraph = true;
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

//export const paragraphParser = new ParagraphParser("paragraph", BlockNode);
