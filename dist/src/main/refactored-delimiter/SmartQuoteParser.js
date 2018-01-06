"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DelimitedInlineSubParser_1 = require("../DelimitedInlineSubParser");
var C_SINGLEQUOTE = 39;
var C_DOUBLEQUOTE = 34;
class SmartQuoteParser extends DelimitedInlineSubParser_1.DelimitedInlineSubParser {
    getDelimiterCharacterCodes() {
        return [
            C_SINGLEQUOTE,
            C_DOUBLEQUOTE
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
        if (delimiter == C_SINGLEQUOTE) {
            return "\u2019";
        }
        else {
            return "\u201C";
        }
    }
    parse(args, delimiter) {
        if (args.closer == null) {
            throw new Error("closer cannot be null");
        }
        if (delimiter == C_SINGLEQUOTE) {
            args.closer.node.setString("\u2019");
            if (args.openerFound) {
                if (args.opener == null) {
                    throw new Error("opener cannot be null");
                }
                args.opener.node.setString("\u2018");
            }
            return {
                closer: args.closer.next,
            };
        }
        else {
            args.closer.node.setString("\u201D");
            if (args.openerFound) {
                if (args.opener == null) {
                    throw new Error("opener cannot be null");
                }
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