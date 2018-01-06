import { RegexStream } from "./RegexStream";
import { Delimiter, DelimiterCollection } from "./DelimiterCollection";
export interface DelimiterInfo {
    beforeIsPunctuation: boolean;
    afterIsPunctuation: boolean;
    leftFlanking: boolean;
    rightFlanking: boolean;
}
export declare type ParseArgs = ({
    delimiters: DelimiterCollection;
    openerFound: true;
    opener: Delimiter;
    closer: Delimiter;
} | {
    delimiters: DelimiterCollection;
    openerFound: false;
    opener: Delimiter | null;
    closer: Delimiter;
});
export interface ParseResult {
    closer: Delimiter | null;
}
export declare abstract class DelimitedInlineSubParser {
    abstract getDelimiterCharacterCodes(): number[];
    abstract advanceDelimiter(stream: RegexStream, delimiter: number): void;
    abstract canOpen(info: DelimiterInfo, delimiter: number): boolean;
    abstract canClose(info: DelimiterInfo, delimiter: number): boolean;
    abstract getDelimiterContent(stream: RegexStream, delimiterStartPosition: number, delimiter: number): string;
    abstract parse(args: ParseArgs, delimiter: number): ParseResult;
}
