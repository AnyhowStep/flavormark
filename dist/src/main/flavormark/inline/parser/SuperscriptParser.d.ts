import { DelimitedInlineSubParser, DelimiterInfo, ParseArgs, ParseResult } from "./../../../DelimitedInlineSubParser";
import { RegexStream } from "./../../../RegexStream";
export declare class SuperscriptParser extends DelimitedInlineSubParser {
    getDelimiterCharacters(): string[];
    advanceDelimiter(stream: RegexStream, delimiter: string): void;
    canOpen(info: DelimiterInfo): boolean;
    canClose(info: DelimiterInfo): boolean;
    getDelimiterContent(stream: RegexStream, delimiterStartPosition: number, _delimiter: string): string;
    parse(args: ParseArgs, _delimiter: string): ParseResult;
}
