"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParagraphContentParser_1 = require("./ParagraphContentParser");
const link_util_1 = require("./../../link-util");
class LinkReferenceDefinitionParser extends ParagraphContentParser_1.ParagraphContentParser {
    constructor(refMap) {
        super();
        this.refMap = refMap;
    }
    reinit() {
        for (let k of Object.keys(this.refMap)) {
            delete this.refMap[k];
        }
    }
    parse(paragraphParser, paragraph) {
        const content = paragraphParser.getString(paragraph);
        if (content[0] != "[") {
            return false;
        }
        const pos = link_util_1.parseReference(content, this.refMap);
        if (pos == 0) {
            return false;
        }
        paragraphParser.setString(paragraph, content.slice(pos));
        return true;
    }
}
exports.LinkReferenceDefinitionParser = LinkReferenceDefinitionParser;
//# sourceMappingURL=LinkReferenceDefinitionParser.js.map