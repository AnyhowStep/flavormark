import { DelimitedInlineParser, DelimiterInfo, ParseArgs } from "../refactored-delimiter/DelimitedInlineParser";
import { RegexStream } from "../refactored-misc/RegexStream";
export declare class SuperscriptParser extends DelimitedInlineParser {
    getDelimiterCharacterCodes(): number[];
    advanceDelimiter(stream: RegexStream, _delimiter: number): void;
    canOpen(info: DelimiterInfo): boolean;
    canClose(info: DelimiterInfo): boolean;
    getDelimiterContent(_stream: RegexStream, _delimiterStartPosition: number, _delimiter: number): string;
    tryParse(args: ParseArgs, _delimiter: number): boolean;
}
