import {DelimitedInlineSubParser, DelimiterInfo, ParseArgs, ParseResult} from "../DelimitedInlineSubParser";
import {RegexStream} from "../RegexStream";
import {Node} from "../Node";
import {removeDelimitersBetween} from "../DelimiterCollection";
var C_ASTERISK = 42;
var C_UNDERSCORE = 95;

export class EmphasisParser extends DelimitedInlineSubParser {
    public getDelimiterCharacterCodes () : number[] {
        return [
            C_ASTERISK,
            C_UNDERSCORE
        ];
    }
    public advanceDelimiter (stream : RegexStream, delimiter : number) : void {
        while (stream.peek() === delimiter) {
            ++stream.pos;
        }
    }
    public canOpen (info : DelimiterInfo, delimiter : number) : boolean {
        if (delimiter == C_ASTERISK) {
            return info.leftFlanking;
        } else {
            return (
                info.leftFlanking &&
                (
                    !info.rightFlanking ||
                    info.beforeIsPunctuation
                )
            );
        }
    }
    public canClose (info : DelimiterInfo, delimiter : number) : boolean {
        if (delimiter == C_ASTERISK) {
            return info.rightFlanking;
        } else {
            return (
                info.rightFlanking &&
                (
                    !info.leftFlanking ||
                    info.afterIsPunctuation
                )
            );
        }
    }

    public getDelimiterContent (stream : RegexStream, delimiterStartPosition : number) : string {
        return stream.subject.slice(delimiterStartPosition, stream.pos);
    }
    public parse (args : ParseArgs) : ParseResult {
        if (args.closer == undefined) {
            throw new Error("closer cannot be undefined");
        }
        if (!args.openerFound) {
            return {
                closer : args.closer.next,
            };
        } else {
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

            opener_inl.setString(
                opener_inl.getString().slice(
                    0,
                    opener_inl.getString().length - delimitersUsed
                )
            );
            closer_inl.setString(
                closer_inl.getString().slice(
                    0,
                    closer_inl.getString().length - delimitersUsed
                )
            );

            // build contents for new emph element
            var emph = new Node(delimitersUsed === 1 ? 'emph' : 'strong');

            let tmp = opener_inl.getNext();
            while (tmp && tmp !== closer_inl) {
                let next = tmp.getNext();
                tmp.unlink();
                emph.appendChild(tmp);
                tmp = next;
            }

            opener_inl.insertAfter(emph);

            // remove elts between opener and closer in delimiters stack
            removeDelimitersBetween(args.opener, args.closer);

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
                    closer : tempstack,
                };
            }
            return {
                closer : args.closer,
            };
        }
    }
}
