"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DelimitedInlineSubParser_1 = require("./../../../DelimitedInlineSubParser");
const DelimiterCollection_1 = require("./../../../DelimiterCollection");
const EmphasisNode_1 = require("../node/EmphasisNode");
const StrongNode_1 = require("../node/StrongNode");
class EmphasisParser extends DelimitedInlineSubParser_1.DelimitedInlineSubParser {
    getDelimiterCharacters() {
        return [
            "*",
            "_"
        ];
    }
    advanceDelimiter(stream, delimiter) {
        while (stream.peek() === delimiter) {
            ++stream.pos;
        }
    }
    canOpen(info, delimiter) {
        if (delimiter == "*") {
            return info.leftFlanking;
        }
        else {
            return (info.leftFlanking &&
                (!info.rightFlanking ||
                    info.beforeIsPunctuation));
        }
    }
    canClose(info, delimiter) {
        if (delimiter == "*") {
            return info.rightFlanking;
        }
        else {
            return (info.rightFlanking &&
                (!info.leftFlanking ||
                    info.afterIsPunctuation));
        }
    }
    getDelimiterContent(stream, delimiterStartPosition) {
        return stream.subject.slice(delimiterStartPosition, stream.pos);
    }
    parse(args) {
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
            let delimitersUsed = (args.closer.numdelims >= 2 && args.opener.numdelims >= 2) ?
                2 : 1;
            let opener_inl = args.opener.node;
            let closer_inl = args.closer.node;
            // remove used delimiters from stack elts and inlines
            args.opener.numdelims -= delimitersUsed;
            args.closer.numdelims -= delimitersUsed;
            opener_inl.setString(opener_inl.getString().slice(0, opener_inl.getString().length - delimitersUsed));
            closer_inl.setString(closer_inl.getString().slice(0, closer_inl.getString().length - delimitersUsed));
            // build contents for new emph element
            const emph = (delimitersUsed == 1) ?
                new EmphasisNode_1.EmphasisNode() :
                new StrongNode_1.StrongNode();
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
exports.EmphasisParser = EmphasisParser;
//# sourceMappingURL=EmphasisParser.js.map