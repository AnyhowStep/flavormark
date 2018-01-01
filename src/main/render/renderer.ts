import {Node} from "../node";

export class Renderer {
    buffer : string = "";
    lastOut : string = "";
    public get (str : string) {
        return (this as any)[str];
    }
    /**
     *  Walks the AST and calls member methods for each Node type.
     *
     *  @param ast {Node} The root of the abstract syntax tree.
     */
    public render(ast : Node) {
      var walker = ast.walker()
        , event
        , type;

      this.buffer = '';
      this.lastOut = '\n';

      while((event = walker.next())) {
        type = event.node.type;
        if (this.get(type)) {
          this.get(type)(event.node, event.entering);
        }
      }
      return this.buffer;
    }

    /**
     *  Concatenate a literal string to the buffer.
     *
     *  @param str {String} The string to concatenate.
     */
    lit(str : string|undefined|null) {
        if (str == null) {
            throw new Error("str cannot be null")
        }
      this.buffer += str;
      this.lastOut = str;
    }

    /**
     *  Output a newline to the buffer.
     */
    cr() {
      if (this.lastOut !== '\n') {
        this.lit('\n');
      }
    }

    /**
     *  Concatenate a string to the buffer possibly escaping the content.
     *
     *  Concrete renderer implementations should override this method.
     *
     *  @param str {String} The string to concatenate.
     */
    out(str : string) {
      this.lit(str);
    }

    /**
     *  Escape a string for the target renderer.
     *
     *  Abstract that should be implemented by concrete
     *  renderer implementations.
     *
     *  @param str {String} The string to escape.
     */
    esc(str : string) {
      return str;
    }
}
