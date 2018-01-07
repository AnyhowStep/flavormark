"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const string_util_1 = require("./../../string-util");
const link_util_1 = require("./../../link-util");
const ParagraphNode_1 = require("./../node/ParagraphNode");
class ParagraphParser extends BlockParser_1.BlockParser {
    constructor(refMap, nodeCtor = ParagraphNode_1.ParagraphNode) {
        super(nodeCtor);
        this.acceptsLines = true;
        this.parseInlines = true;
        this.acceptLazyContinuation = true;
        this.isLeaf = true;
        this.isParagraph = true;
        this.refMap = refMap;
    }
    reinit() {
        for (let k of Object.keys(this.refMap)) {
            delete this.refMap[k];
        }
    }
    continue(parser) {
        return parser.blank ? false : true;
    }
    finalize(_parser, node) {
        let hasReferenceDefs = false;
        //TODO move to a different class. Pre-processor or parser of some sort
        // try parsing the beginning as link reference definitions:
        while (node.stringContent[0] === "[") {
            const pos = link_util_1.parseReference(node.stringContent, this.refMap);
            if (pos == 0) {
                break;
            }
            node.stringContent = node.stringContent.slice(pos);
            hasReferenceDefs = true;
        }
        if (hasReferenceDefs && string_util_1.isBlank(node.stringContent)) {
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