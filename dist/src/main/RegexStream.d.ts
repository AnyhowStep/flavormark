export declare class RegexStream {
    subject: string;
    pos: number;
    constructor(subject: string);
    match(re: RegExp): string | undefined;
    hasCharacters(): boolean;
    peek(): string | undefined;
    spnl(): boolean;
}
