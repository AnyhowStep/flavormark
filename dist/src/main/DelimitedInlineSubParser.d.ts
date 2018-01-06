import { RegexStream } from "./RegexStream";
import { Delimiter, DelimiterCollection } from "./DelimiterCollection";
export interface DelimiterInfo {
    beforeIsPunctuation: boolean;
    afterIsPunctuation: boolean;
    leftFlanking: boolean;
    rightFlanking: boolean;
}
export interface ParseArgs {
    delimiters: DelimiterCollection;
    openerFound: boolean;
    opener: Delimiter | null;
    closer: Delimiter | null;
}
export declare abstract class DelimitedInlineSubParser {
    abstract getDelimiterCharacterCodes(): number[];
    abstract advanceDelimiter(stream: RegexStream, delimiter: number): void;
    abstract canOpen(info: DelimiterInfo, delimiter: number): boolean;
    abstract canClose(info: DelimiterInfo, delimiter: number): boolean;
    abstract getDelimiterContent(stream: RegexStream, delimiterStartPosition: number, delimiter: number): string;
    abstract tryParse(args: ParseArgs, delimiter: number): boolean;
}
