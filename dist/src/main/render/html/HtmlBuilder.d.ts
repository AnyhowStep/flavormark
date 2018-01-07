export declare class HtmlBuilder {
    private buffer;
    private disableTagCount;
    toString(): string;
    addDisableTag(): void;
    removeDisableTag(): void;
    tagsAllowed(): boolean;
    appendOne(str: string): this;
    append(...arr: string[]): this;
    tag(name: string, attrs?: [string, string][], selfClosing?: boolean): this;
    nl(): this;
}
