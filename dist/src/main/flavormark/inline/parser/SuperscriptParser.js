"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DelimitedInlineSubParser_1 = require("./../../../DelimitedInlineSubParser");
const DelimiterCollection_1 = require("./../../../DelimiterCollection");
const SuperscriptNode_1 = require("../node/SuperscriptNode");
const CARET_CHAR = "^";
const C_CARET = CARET_CHAR.charCodeAt(0);
class SuperscriptParser extends DelimitedInlineSubParser_1.DelimitedInlineSubParser {
    getDelimiterCharacterCodes() {
        return [
            C_CARET,
        ];
    }
    advanceDelimiter(stream, delimiter) {
        while (stream.peek() === delimiter) {
            ++stream.pos;
        }
    }
    canOpen(info) {
        return info.leftFlanking;
    }
    canClose(info) {
        return info.rightFlanking;
    }
    getDelimiterContent(_stream, _delimiterStartPosition, _delimiter) {
        return CARET_CHAR;
    }
    parse(args, _delimiter) {
        if (args.closer == undefined) {
            throw new Error("closer cannot be undefined");
        }
        if (!args.openerFound) {
            return {
                closer: args.closer.next,
            };
        }
        else {
            if (args.opener == undefined) {
                throw new Error("opener cannot be undefined");
            }
            // calculate actual number of delimiters used from closer
            let delimitersUsed = 1;
            let opener_inl = args.opener.node;
            let closer_inl = args.closer.node;
            // remove used delimiters from stack
            args.opener.numdelims -= delimitersUsed;
            args.closer.numdelims -= delimitersUsed;
            opener_inl.setString(opener_inl.getString().slice(0, opener_inl.getString().length - delimitersUsed));
            closer_inl.setString(closer_inl.getString().slice(0, closer_inl.getString().length - delimitersUsed));
            // build contents for new element
            const emph = new SuperscriptNode_1.SuperscriptNode("superscript");
            let tmp = opener_inl.getNext();
            while (tmp && tmp !== closer_inl) {
                let next = tmp.getNext();
                tmp.unlink();
                emph.appendChild(tmp);
                tmp = next;
            }
            opener_inl.insertAfter(emph);
            // remove elts between opener and closer in delimiters stack
            DelimiterCollection_1.removeDelimitersBetween(args.opener, args.closer);
            // if opener has 0 delims, remove it and the inline
            if (args.opener.numdelims === 0) {
                opener_inl.unlink();
                args.delimiters.remove(args.opener);
            }
            if (args.closer.numdelims === 0) {
                closer_inl.unlink();
                let tempstack = args.closer.next;
                args.delimiters.remove(args.closer);
                return {
                    closer: tempstack,
                };
            }
            return {
                closer: args.closer,
            };
        }
    }
}
exports.SuperscriptParser = SuperscriptParser;
//# sourceMappingURL=SuperscriptParser.js.map