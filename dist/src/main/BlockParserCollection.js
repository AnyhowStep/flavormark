"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlockParserCollection {
    constructor(documentParser, paragraphParser) {
        this.dict = {};
        this.arr = [];
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
    getDocumentParser() {
        return this.documentParser;
    }
    getParagraphParser() {
        return this.paragraphParser;
    }
    hasName(name) {
        return (this.dict[name] != null);
    }
    add(parser) {
        const name = parser.getNodeType();
        if (this.hasName(name)) {
            throw new Error(`Parser ${name} has already been added`);
        }
        this.dict[name] = parser;
        this.arr.push(parser);
        return this;
    }
    has(key) {
        if (typeof key != "string") {
            return this.has(key.type);
        }
        return this.dict[key] != null;
    }
    get(key) {
        if (typeof key != "string") {
            return this.get(key.type);
        }
        const result = this.dict[key];
        if (result == null) {
            throw new Error(`Parser ${key} does not exist`);
        }
        return result;
    }
    length() {
        return this.arr.length;
    }
    at(index) {
        return this.arr[index];
    }
    isParagraphNode(node) {
        return (this.getParagraphParser().getNodeType() == node.type &&
            node instanceof this.getParagraphParser().getNodeCtor());
    }
    instantiateDocument(sourcepos) {
        const ctor = this.getDocumentParser().getNodeCtor();
        return new ctor(this.getDocumentParser().getNodeType(), sourcepos);
    }
    reinit() {
        this.documentParser.reinit();
        this.paragraphParser.reinit();
        for (let b of this.arr) {
            b.reinit();
        }
    }
}
exports.BlockParserCollection = BlockParserCollection;
//# sourceMappingURL=BlockParserCollection.js.map