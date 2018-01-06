import {RegexStream} from "./RegexStream";
import {Delimiter, DelimiterCollection} from "./DelimiterCollection";

export interface DelimiterInfo {
    beforeIsPunctuation : boolean,
    afterIsPunctuation : boolean,
    leftFlanking : boolean,
    rightFlanking : boolean,
}

export type ParseArgs = (
    {
        delimiters : DelimiterCollection;
        openerFound : true;
        opener : Delimiter;
        closer : Delimiter;
    } |
    {
        delimiters : DelimiterCollection;
        openerFound : false;
        opener : Delimiter|null;
        closer : Delimiter;
    }
);
export interface ParseResult {
    closer : Delimiter|null,
}
export abstract class DelimitedInlineSubParser {
    public abstract getDelimiterCharacterCodes () : number[];
    public abstract advanceDelimiter (stream : RegexStream, delimiter : number) : void;
    public abstract canOpen (info : DelimiterInfo, delimiter : number) : boolean;
    public abstract canClose (info : DelimiterInfo, delimiter : number) : boolean;

    public abstract getDelimiterContent (stream : RegexStream, delimiterStartPosition : number, delimiter : number) : string;
    public abstract parse (args : ParseArgs, delimiter : number) : ParseResult;
}
