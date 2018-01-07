import {BlockParser, BlockNodeCtor} from "../BlockParser";
import {Parser} from "../Parser";
import {peek, isBlank} from "../refactored/util";
import {parseReference} from "../refactored-misc/util";
import {RefMap} from "../refactored-misc/RefMap";
import {ParagraphNode} from "./block/node/ParagraphNode";

const C_OPEN_BRACKET = 91;

export class ParagraphParser extends BlockParser<ParagraphNode> {
    public acceptsLines = true;
    public parseInlines = true;
    public acceptLazyContinuation = true;
    public isLeaf = true;
    public isParagraph = true;

    private refMap : RefMap;
    public constructor (refMap : RefMap, nodeType : string = "paragraph", nodeCtor : BlockNodeCtor<ParagraphNode> = ParagraphNode) {
        super(nodeType, nodeCtor);
        this.refMap = refMap;
    }

    public reinit () {
        for (let k of Object.keys(this.refMap)) {
            delete this.refMap[k];
        }
    }
    public continue (parser : Parser) {
        return parser.blank ? false : true;
    }
    public finalize (_parser : Parser, node : ParagraphNode) {
        let hasReferenceDefs = false;

        // try parsing the beginning as link reference definitions:
        while (peek(node.stringContent, 0) === C_OPEN_BRACKET) {
            const pos = parseReference(node.stringContent, this.refMap);
            if (pos == 0) {
                break;
            }

            node.stringContent = node.stringContent.slice(pos);
            hasReferenceDefs = true;
        }
        if (hasReferenceDefs && isBlank(node.stringContent)) {
            node.unlink();
        }
    };
    public canContain () { return false; }
    public appendString (node : ParagraphNode, str : string) : void {
        if (node.stringContent == undefined) {
            node.stringContent = "";
        }
        node.stringContent += str;
    }
    public setString (node : ParagraphNode, str : string) : void {
        node.stringContent = str;
    }
    public getString (node : ParagraphNode) : string {
        return node.stringContent;
    }
}
