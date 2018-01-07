import { DelimitedInlineSubParser, DelimiterInfo, ParseArgs, ParseResult } from "./../../../DelimitedInlineSubParser";
import { RegexStream } from "./../../../RegexStream";
export declare class EmphasisParser extends DelimitedInlineSubParser {
    getDelimiterCharacters(): string[];
    advanceDelimiter(stream: RegexStream, delimiter: string): void;
    canOpen(info: DelimiterInfo, delimiter: string): boolean;
    canClose(info: DelimiterInfo, delimiter: string): boolean;
    getDelimiterContent(stream: RegexStream, delimiterStartPosition: number): string;
    parse(args: ParseArgs): ParseResult;
}
