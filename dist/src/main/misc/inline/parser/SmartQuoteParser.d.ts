import { DelimitedInlineSubParser, DelimiterInfo, ParseArgs, ParseResult } from "./../../../DelimitedInlineSubParser";
import { RegexStream } from "./../../../RegexStream";
export declare class SmartQuoteParser extends DelimitedInlineSubParser {
    getDelimiterCharacters(): string[];
    advanceDelimiter(stream: RegexStream): void;
    canOpen(info: DelimiterInfo): boolean;
    canClose(info: DelimiterInfo): boolean;
    getDelimiterContent(_stream: RegexStream, _delimiterStartPosition: number, delimiter: string): string;
    parse(args: ParseArgs, delimiter: string): ParseResult;
}
