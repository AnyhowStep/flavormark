import {DelimitedInlineParser, DelimiterInfo, ParseArgs} from "../refactored-delimiter/DelimitedInlineParser";
import {RegexStream} from "../RegexStream";
import {Node} from "../Node";
import {removeDelimitersBetween} from "../refactored-misc/DelimiterCollection";

var TILDE_CHAR = "~";
var C_TILDE = TILDE_CHAR.charCodeAt(0);


export class StrikethroughParser extends DelimitedInlineParser {
    public getDelimiterCharacterCodes () : number[] {
        return [
            C_TILDE,
        ];
    }
    public advanceDelimiter (stream : RegexStream, delimiter : number) : void {
        while (stream.peek() === delimiter) {
            ++stream.pos;
        }
    }
    public canOpen (info : DelimiterInfo) : boolean {
        return info.leftFlanking;
    }
    public canClose (info : DelimiterInfo) : boolean {
        return info.rightFlanking;
    }

    public getDelimiterContent (stream : RegexStream, delimiterStartPosition : number, _delimiter : number) : string {
        return stream.subject.slice(delimiterStartPosition, stream.pos);
    }
    public tryParse (args : ParseArgs, _delimiter : number) : boolean {
        if (args.closer == null) {
            throw new Error("closer cannot be null");
        }
        if (!args.openerFound) {
            args.closer = args.closer.next;
        } else {
            if (args.opener == null) {
                throw new Error("opener cannot be null");
            }
            // calculate actual number of delimiters used from closer

            let opener_inl = args.opener.node;
            let closer_inl = args.closer.node;

            // remove used delimiters from stack
            args.opener.numdelims = 0;
            args.closer.numdelims = 0;

            opener_inl.setString(
                opener_inl.getString().slice(
                    0,
                    opener_inl.getString().length
                )
            );
            closer_inl.setString(
                closer_inl.getString().slice(
                    0,
                    closer_inl.getString().length
                )
            );

            // build contents for new element
            var emph = new Node("strikethrough");

            let tmp = opener_inl.next;
            while (tmp && tmp !== closer_inl) {
                let next = tmp.next;
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
                args.closer = tempstack;
            }
        }
        return true;
    }
}
