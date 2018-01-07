"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DelimitedInlineSubParser_1 = require("./../../../DelimitedInlineSubParser");
class SmartQuoteParser extends DelimitedInlineSubParser_1.DelimitedInlineSubParser {
    getDelimiterCharacters() {
        return [
            "'",
            "\""
        ];
    }
    advanceDelimiter(stream) {
        ++stream.pos;
    }
    canOpen(info) {
        return info.leftFlanking && !info.rightFlanking;
    }
    canClose(info) {
        return info.rightFlanking;
    }
    getDelimiterContent(_stream, _delimiterStartPosition, delimiter) {
        if (delimiter == "'") {
            return "\u2019";
        }
        else {
            return "\u201C";
        }
    }
    parse(args, delimiter) {
        if (delimiter == "'") {
            args.closer.node.setString("\u2019");
            if (args.openerFound) {
                args.opener.node.setString("\u2018");
            }
            return {
                closer: args.closer.next,
            };
        }
        else {
            args.closer.node.setString("\u201D");
            if (args.openerFound) {
                args.opener.node.setString("\u201C");
            }
            return {
                closer: args.closer.next,
            };
        }
    }
}
exports.SmartQuoteParser = SmartQuoteParser;
//# sourceMappingURL=SmartQuoteParser.js.map