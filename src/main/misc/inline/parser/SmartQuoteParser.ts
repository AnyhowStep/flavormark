import {DelimitedInlineSubParser, DelimiterInfo, ParseArgs, ParseResult} from "./../../../DelimitedInlineSubParser";
import {RegexStream} from "./../../../RegexStream";

export class SmartQuoteParser extends DelimitedInlineSubParser {
    public getDelimiterCharacters () : string[] {
        return [
            "'",
            "\""
        ];
    }
    public advanceDelimiter (stream : RegexStream) : void {
        ++stream.pos;
    }
    public canOpen (info : DelimiterInfo) : boolean {
        return info.leftFlanking && !info.rightFlanking;
    }
    public canClose (info : DelimiterInfo) : boolean {
        return info.rightFlanking;
    }

    public getDelimiterContent (_stream : RegexStream, _delimiterStartPosition : number, delimiter : string) : string {
        if (delimiter == "'") {
            return "\u2019";
        } else {
            return "\u201C";
        }
    }
    public parse (args : ParseArgs, delimiter : string) : ParseResult {
        if (delimiter == "'") {
            args.closer.node.setString("\u2019");
            if (args.openerFound) {
                args.opener.node.setString("\u2018");
            }
            return {
                closer : args.closer.next,
            };
        } else {
            args.closer.node.setString("\u201D");
            if (args.openerFound) {
                args.opener.node.setString("\u201C");
            }
            return {
                closer : args.closer.next,
            };
        }
    }
}
