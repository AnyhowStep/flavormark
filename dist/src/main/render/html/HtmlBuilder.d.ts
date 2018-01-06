export declare class HtmlBuilder {
    private buffer;
    toString(): string;
    appendOne(str: string): this;
    append(...arr: string[]): this;
    tag(name: string, attrs?: [string, string][], selfClosing?: boolean): this;
    nl(): this;
}
