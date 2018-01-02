import {BlockParser} from "./BlockParser";
import {BlockNode} from "./BlockNode";

export class BlockParserCollection<DocumentT extends BlockNode=BlockNode, ParagraphT extends BlockNode=BlockNode> {
    private documentParser : BlockParser<DocumentT>;
    private paragraphParser : BlockParser<ParagraphT>;

    private dict : {
        [name : string] : BlockParser<any>|undefined
    } = {};
    private arr : BlockParser[] = [];

    public constructor (documentParser : BlockParser<DocumentT>, paragraphParser : BlockParser<ParagraphT>) {
        if (!paragraphParser.acceptsLines || !paragraphParser.isParagraph) {
            throw new Error(`Paragraph parser must accept lines and be a paragraph`);
        }
        if (documentParser.getNodeType() == paragraphParser.getNodeType()) {
            throw new Error(`Document and paragraph parser cannot both have the same name ${documentParser.getNodeType()}`);
        }
        this.documentParser = documentParser;
        this.paragraphParser = paragraphParser;

        this.dict[documentParser.getNodeType()] = documentParser;
        this.dict[paragraphParser.getNodeType()] = paragraphParser;
    }

    public getDocumentParser () {
        return this.documentParser;
    }
    public getParagraphParser () {
        return this.paragraphParser;
    }
    public hasName (name : string) {
        return (this.dict[name] != null);
    }
    public add (parser : BlockParser) : this {
        const name = parser.getNodeType();
        if (this.hasName(name)) {
            throw new Error(`Parser ${name} has already been added`)
        }
        this.dict[name] = parser;
        this.arr.push(parser);
        return this;
    }
    public get<NodeT extends BlockNode> (key : NodeT) : BlockParser<NodeT>;
    public get (key : string) : BlockParser<BlockNode>;
    public get (key : string|BlockNode) : BlockParser<BlockNode> {
        if (typeof key != "string") {
            return this.get(key.type);
        }
        const result = this.dict[key];
        if (result == null) {
            throw new Error(`Parser ${key} does not exist`);
        }
        return result;
    }
    public length () {
        return this.arr.length;
    }
    public at (index : number) : BlockParser<BlockNode> {
        return this.arr[index];
    }
    public isParagraphNode (node : BlockNode) : node is ParagraphT {
        return (
            this.getParagraphParser().getNodeType() == node.type &&
            node instanceof this.getParagraphParser().getNodeCtor()
        );
    }
    public instantiateDocument (sourcepos : [[number, number], [number, number]]) : DocumentT {
        const ctor = this.getDocumentParser().getNodeCtor();
        return new ctor(this.getDocumentParser().getNodeType(), sourcepos);
    }
    public reinit () {
        this.documentParser.reinit();
        this.paragraphParser.reinit();
        for (let b of this.arr) {
            b.reinit();
        }
    }
}
