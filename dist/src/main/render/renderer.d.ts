import { Node } from "../Node";
export declare class Renderer {
    buffer: string;
    lastOut: string;
    get(str: string): any;
    /**
     *  Walks the AST and calls member methods for each Node type.
     *
     *  @param ast {Node} The root of the abstract syntax tree.
     */
    render(ast: Node): string;
    /**
     *  Concatenate a literal string to the buffer.
     *
     *  @param str {String} The string to concatenate.
     */
    lit(str: string | undefined): void;
    /**
     *  Output a newline to the buffer.
     */
    cr(): void;
    /**
     *  Concatenate a string to the buffer possibly escaping the content.
     *
     *  Concrete renderer implementations should override this method.
     *
     *  @param str {String} The string to concatenate.
     */
    out(str: string): void;
    /**
     *  Escape a string for the target renderer.
     *
     *  Abstract that should be implemented by concrete
     *  renderer implementations.
     *
     *  @param str {String} The string to escape.
     */
    esc(str: string): string;
}
