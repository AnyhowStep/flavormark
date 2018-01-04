import { DelimitedInlineParser, DelimiterInfo, ParseArgs } from "../refactored-delimiter/DelimitedInlineParser";
import { RegexStream } from "../refactored-misc/RegexStream";
export declare class StrikethroughParser extends DelimitedInlineParser {
    getDelimiterCharacterCodes(): number[];
    advanceDelimiter(stream: RegexStream, delimiter: number): void;
    canOpen(info: DelimiterInfo): boolean;
    canClose(info: DelimiterInfo): boolean;
    getDelimiterContent(stream: RegexStream, delimiterStartPosition: number, _delimiter: number): string;
    tryParse(args: ParseArgs, _delimiter: number): boolean;
}
