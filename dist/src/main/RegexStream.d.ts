export declare class RegexStream {
    subject: string;
    pos: number;
    constructor(subject: string);
    match(re: RegExp): string | undefined;
    hasCharacters(): boolean;
    peek(): number;
    peekChar(): string | -1;
    spnl(): boolean;
}
