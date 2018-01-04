import { DelimitedInlineParser, DelimiterInfo, ParseArgs } from "./DelimitedInlineParser";
import { RegexStream } from "../refactored-misc/RegexStream";
export declare class EmphasisParser extends DelimitedInlineParser {
    getDelimiterCharacterCodes(): number[];
    advanceDelimiter(stream: RegexStream, delimiter: number): void;
    canOpen(info: DelimiterInfo, delimiter: number): boolean;
    canClose(info: DelimiterInfo, delimiter: number): boolean;
    getDelimiterContent(stream: RegexStream, delimiterStartPosition: number): string;
    tryParse(args: ParseArgs): boolean;
}
