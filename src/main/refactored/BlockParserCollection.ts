import {BlockParser} from "./BlockParser";
import {BlockNode} from "./BlockNode";

export class BlockParserCollection {
    private documentParser : BlockParser;
    private paragraphParser : BlockParser;

    private dict : {
        [name : string] : BlockParser|undefined
    } = {};
    private arr : BlockParser[] = [];

    public constructor (documentParser : BlockParser, paragraphParser : BlockParser) {
        if (!paragraphParser.acceptsLines || !paragraphParser.isParagraph) {
            throw new Error(`Paragraph parser must accept lines and be a paragraph`);
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
    public get (key : string|BlockNode) : BlockParser {
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
    public at (index : number) {
        return this.arr[index];
    }
}
