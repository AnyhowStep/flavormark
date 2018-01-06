import { DelimitedInlineSubParser, DelimiterInfo, ParseArgs } from "../DelimitedInlineSubParser";
import { RegexStream } from "../RegexStream";
export declare class StrikethroughParser extends DelimitedInlineSubParser {
    getDelimiterCharacterCodes(): number[];
    advanceDelimiter(stream: RegexStream, delimiter: number): void;
    canOpen(info: DelimiterInfo): boolean;
    canClose(info: DelimiterInfo): boolean;
    getDelimiterContent(stream: RegexStream, delimiterStartPosition: number, _delimiter: number): string;
    tryParse(args: ParseArgs, _delimiter: number): boolean;
}
