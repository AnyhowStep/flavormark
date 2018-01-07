import { DelimitedInlineSubParser, DelimiterInfo, ParseArgs, ParseResult } from "./../../../DelimitedInlineSubParser";
import { RegexStream } from "./../../../RegexStream";
export declare class SuperscriptParser extends DelimitedInlineSubParser {
    getDelimiterCharacterCodes(): number[];
    advanceDelimiter(stream: RegexStream, delimiter: number): void;
    canOpen(info: DelimiterInfo): boolean;
    canClose(info: DelimiterInfo): boolean;
    getDelimiterContent(_stream: RegexStream, _delimiterStartPosition: number, _delimiter: number): string;
    parse(args: ParseArgs, _delimiter: number): ParseResult;
}
