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
    opener: Delimiter | undefined;
    closer: Delimiter;
});
export interface ParseResult {
    closer: Delimiter | undefined;
}
export declare abstract class DelimitedInlineSubParser {
    abstract getDelimiterCharacters(): string[];
    abstract advanceDelimiter(stream: RegexStream, delimiter: string): void;
    abstract canOpen(info: DelimiterInfo, delimiter: string): boolean;
    abstract canClose(info: DelimiterInfo, delimiter: string): boolean;
    abstract getDelimiterContent(stream: RegexStream, delimiterStartPosition: number, delimiter: string): string;
    abstract parse(args: ParseArgs, delimiter: string): ParseResult;
}
