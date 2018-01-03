import { Renderer } from "./renderer";
import { Node } from "../node";
export interface Options {
    softbreak?: string;
    safe?: boolean;
    sourcepos?: boolean;
}
export declare class HtmlRenderer extends Renderer {
    disableTags: number;
    lastOut: string;
    options: Options;
    esc(str: string, preserve_entities?: boolean): string;
    constructor(options?: Options);
    tag(name: string, attrs?: string[][], selfclosing?: boolean): void;
    text(node: any): void;
    softbreak(): void;
    linebreak(): void;
    link(node: Node, entering: boolean): void;
    image(node: Node, entering: boolean): void;
    emph(_node: Node, entering: boolean): void;
    strong(_node: Node, entering: boolean): void;
    paragraph(node: any, entering: boolean): void;
    atx_heading(node: any, entering: boolean): void;
    setext_heading(node: any, entering: boolean): void;
    code(node: any): void;
    indented_code_block(node: any): void;
    fenced_code_block(node: any): void;
    thematic_break(node: Node): void;
    block_quote(node: Node, entering: boolean): void;
    list(node: any, entering: boolean): void;
    item(node: Node, entering: boolean): void;
    html_inline(node: any): void;
    html_block(node: any): void;
    out(s: string | null): void;
    attrs(node: Node): string[][];
    get(str: string): any;
}
