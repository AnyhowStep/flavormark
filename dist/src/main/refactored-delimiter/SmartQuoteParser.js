"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DelimitedInlineParser_1 = require("./DelimitedInlineParser");
var C_SINGLEQUOTE = 39;
var C_DOUBLEQUOTE = 34;
class SmartQuoteParser extends DelimitedInlineParser_1.DelimitedInlineParser {
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
    tryParse(args, delimiter) {
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
            args.closer = args.closer.next;
        }
        else {
            args.closer.node.setString("\u201D");
            if (args.openerFound) {
                if (args.opener == null) {
                    throw new Error("opener cannot be null");
                }
                args.opener.node.setString("\u201C");
            }
            args.closer = args.closer.next;
        }
        return true;
    }
}
exports.SmartQuoteParser = SmartQuoteParser;
//# sourceMappingURL=SmartQuoteParser.js.map