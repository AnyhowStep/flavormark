"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlockParser {
    constructor(nodeCtor) {
        this.acceptsLines = false;
        this.nodeCtor = nodeCtor;
    }
    canBeContainedBy(_blockParser, _node) {
        return true;
    }
    isParserOf(node) {
        return node instanceof this.nodeCtor;
    }
    getNodeCtor() {
        return this.nodeCtor;
    }
    getName() {
        return this.nodeCtor.name;
    }
    instantiate(sourceRange) {
        return new this.nodeCtor(sourceRange);
    }
    //Only called if acceptsLines is true
    appendString(_node, _str) {
        throw new Error(`appendString() not implemented for ${this.getName()}`);
    }
    getString(_node) {
        return "";
    }
    setString(_node, _str) {
    }
    isActuallyParagraph() {
        return (this.acceptsLines == true && this.isParagraph == true);
    }
    //Called before the parser starts parsing content
    reinit() { }
    tryStart(_parser, _container) {
        return false;
    }
    lazyContinue(_parser, _block) {
    }
    finalizeAtLine(_parser, _container) {
        return false;
    }
    ignoreLastLineBlank(_parser, _container) {
        return false;
    }
}
exports.BlockParser = BlockParser;
;
//# sourceMappingURL=BlockParser.js.map