"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const string_util_1 = require("./../../string-util");
const ParagraphNode_1 = require("./../node/ParagraphNode");
class ParagraphParser extends BlockParser_1.BlockParser {
    constructor(contentParsers, nodeCtor = ParagraphNode_1.ParagraphNode) {
        super(nodeCtor);
        this.acceptsLines = true;
        this.parseInlines = true;
        this.acceptLazyContinuation = true;
        this.isLeaf = true;
        this.isParagraph = true;
        this.contentParsers = contentParsers;
    }
    reinit() {
        for (let p of this.contentParsers) {
            p.reinit();
        }
    }
    continue(parser) {
        return parser.blank ? false : true;
    }
    finalize(parser, node) {
        let parsed = true;
        while (parsed) {
            parsed = false;
            for (let p of this.contentParsers) {
                if (p.parse(this, node, parser)) {
                    parsed = true;
                    break;
                }
            }
        }
        if (string_util_1.isBlank(node.stringContent)) {
            node.unlink();
        }
    }
    ;
    canContain() { return false; }
    appendString(node, str) {
        if (node.stringContent == undefined) {
            node.stringContent = "";
        }
        node.stringContent += str;
    }
    setString(node, str) {
        node.stringContent = str;
    }
    getString(node) {
        return node.stringContent;
    }
}
exports.ParagraphParser = ParagraphParser;
//# sourceMappingURL=ParagraphParser.js.map