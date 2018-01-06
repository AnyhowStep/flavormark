"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlockParser {
    constructor(nodeType, nodeCtor) {
        //BEGIN META
        this.canContain = () => {
            throw new Error("Not implemented");
        };
        this.canBeContainedBy = () => {
            return true;
        };
        this.acceptsLines = false;
        this.finalize = () => {
            throw new Error("Not implemented");
        };
        this.nodeType = nodeType;
        this.nodeCtor = nodeCtor;
    }
    getNodeType() {
        return this.nodeType;
    }
    getNodeCtor() {
        return this.nodeCtor;
    }
    //Called before the parser starts parsing content
    reinit() { }
    //Only called if acceptsLines is true
    appendString(_node, _str) {
        throw new Error(`appendString() not implemented for ${this.getNodeType()}`);
    }
    getString(_node) {
        return "";
    }
    setString(_node, _str) {
    }
    isActuallyParagraph() {
        return (this.acceptsLines == true && this.isParagraph == true);
    }
    continue(_parser, _block) {
        throw new Error("Not implemented");
    }
    lazyContinue(_parser, _block) { }
}
exports.BlockParser = BlockParser;
;
//# sourceMappingURL=BlockParser.js.map