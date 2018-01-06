import { DelimitedInlineSubParser, DelimiterInfo, ParseArgs, ParseResult } from "../DelimitedInlineSubParser";
import { RegexStream } from "../RegexStream";
export declare class EmphasisParser extends DelimitedInlineSubParser {
    getDelimiterCharacterCodes(): number[];
    advanceDelimiter(stream: RegexStream, delimiter: number): void;
    canOpen(info: DelimiterInfo, delimiter: number): boolean;
    canClose(info: DelimiterInfo, delimiter: number): boolean;
    getDelimiterContent(stream: RegexStream, delimiterStartPosition: number): string;
    parse(args: ParseArgs): ParseResult;
}
