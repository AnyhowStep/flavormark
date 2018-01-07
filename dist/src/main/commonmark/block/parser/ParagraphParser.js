"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const util_1 = require("./../../../refactored/util");
const util_2 = require("./../../../refactored-misc/util");
const ParagraphNode_1 = require("./../node/ParagraphNode");
const C_OPEN_BRACKET = 91;
class ParagraphParser extends BlockParser_1.BlockParser {
    constructor(refMap, nodeType = "paragraph", nodeCtor = ParagraphNode_1.ParagraphNode) {
        super(nodeType, nodeCtor);
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
        // try parsing the beginning as link reference definitions:
        while (util_1.peek(node.stringContent, 0) === C_OPEN_BRACKET) {
            const pos = util_2.parseReference(node.stringContent, this.refMap);
            if (pos == 0) {
                break;
            }
            node.stringContent = node.stringContent.slice(pos);
            hasReferenceDefs = true;
        }
        if (hasReferenceDefs && util_1.isBlank(node.stringContent)) {
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