"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlockParserCollection {
    constructor(documentParser, paragraphParser) {
        this.arr = [];
        if (!paragraphParser.isActuallyParagraph()) {
            throw new Error(`Paragraph parser must accept lines and be a paragraph`);
        }
        this.documentParser = documentParser;
        this.paragraphParser = paragraphParser;
        this.arr.push(documentParser);
        this.arr.push(paragraphParser);
    }
    getDocumentParser() {
        return this.documentParser;
    }
    getParagraphParser() {
        return this.paragraphParser;
    }
    add(parser) {
        this.arr.push(parser);
        return this;
    }
    has(key) {
        for (let i of this.arr) {
            if (i.isParserOf(key)) {
                return true;
            }
        }
        return false;
    }
    get(key) {
        for (let i of this.arr) {
            if (i.isParserOf(key)) {
                return i;
            }
        }
        throw new Error(`No parser found for node ${Object.getPrototypeOf(key).constructor.name}`);
    }
    length() {
        return this.arr.length;
    }
    at(index) {
        return this.arr[index];
    }
    isParagraphNode(node) {
        return (Object.getPrototypeOf(node).constructor ==
            this.getParagraphParser().getNodeCtor());
    }
    instantiateDocument(sourcepos) {
        const ctor = this.getDocumentParser().getNodeCtor();
        return new ctor(sourcepos);
    }
    instantiateParagraph(sourcepos) {
        const ctor = this.getParagraphParser().getNodeCtor();
        return new ctor(sourcepos);
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