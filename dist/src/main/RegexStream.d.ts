export declare class RegexStream {
    subject: string;
    pos: number;
    constructor(subject: string);
    match(re: RegExp): string | null;
    hasCharacters(): boolean;
    peek(): number;
    peekChar(): string | -1;
    spnl(): boolean;
}
