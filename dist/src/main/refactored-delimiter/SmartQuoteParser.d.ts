import { DelimitedInlineParser, DelimiterInfo, ParseArgs } from "./DelimitedInlineParser";
import { RegexStream } from "../RegexStream";
export declare class SmartQuoteParser extends DelimitedInlineParser {
    getDelimiterCharacterCodes(): number[];
    advanceDelimiter(stream: RegexStream): void;
    canOpen(info: DelimiterInfo): boolean;
    canClose(info: DelimiterInfo): boolean;
    getDelimiterContent(_stream: RegexStream, _delimiterStartPosition: number, delimiter: number): string;
    tryParse(args: ParseArgs, delimiter: number): boolean;
}
