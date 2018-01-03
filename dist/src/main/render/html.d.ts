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
    text(node: any, entering: boolean): void;
    softbreak(_node: any, entering: boolean): void;
    linebreak(_node: any, entering: boolean): void;
    link(node: any, entering: boolean): void;
    image(node: any, entering: boolean): void;
    emph(_node: Node, entering: boolean): void;
    strong(_node: Node, entering: boolean): void;
    paragraph(node: any, entering: boolean): void;
    atx_heading(node: any, entering: boolean): void;
    setext_heading(node: any, entering: boolean): void;
    code(node: any, entering: boolean): void;
    indented_code_block(node: any, entering: boolean): void;
    fenced_code_block(node: any, entering: boolean): void;
    thematic_break(node: any, entering: boolean): void;
    block_quote(node: Node, entering: boolean): void;
    list(node: any, entering: boolean): void;
    item(node: Node, entering: boolean): void;
    html_inline(node: any, entering: boolean): void;
    html_block(node: any, entering: boolean): void;
    out(s: string | null): void;
    attrs(node: Node): string[][];
    get(str: string): any;
}
