"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderer_1 = require("./renderer");
const common_1 = require("../common");
var reUnsafeProtocol = /^javascript:|vbscript:|file:|data:/i;
var reSafeDataProtocol = /^data:image\/(?:png|gif|jpeg|webp)/i;
var potentiallyUnsafe = (url) => {
    return reUnsafeProtocol.test(url) &&
        !reSafeDataProtocol.test(url);
};
class HtmlRenderer extends renderer_1.Renderer {
    constructor(options) {
        super();
        this.disableTags = 0;
        this.lastOut = "\n";
        options = options || {};
        // by default, soft breaks are rendered as newlines in HTML
        options.softbreak = options.softbreak || '\n';
        // set to "<br />" to make them hard breaks
        // set to " " if you want to ignore line wrapping in source
        this.disableTags = 0;
        this.lastOut = "\n";
        this.options = options;
    }
    esc(str, preserve_entities) {
        return common_1.escapeXml(str, preserve_entities);
    }
    // Helper  to produce an HTML tag.
    tag(name, attrs, selfclosing) {
        if (this.disableTags > 0) {
            return;
        }
        this.buffer += ('<' + name);
        if (attrs && attrs.length > 0) {
            var i = 0;
            var attrib;
            while ((attrib = attrs[i]) !== undefined) {
                this.buffer += (' ' + attrib[0] + '="' + attrib[1] + '"');
                i++;
            }
        }
        if (selfclosing) {
            this.buffer += ' /';
        }
        this.buffer += '>';
        this.lastOut = '>';
    }
    /* Node methods */
    text(node, entering) {
        if (!entering) {
            return;
        }
        this.out(node.literal);
    }
    softbreak(_node, entering) {
        if (!entering) {
            return;
        }
        this.lit(this.options.softbreak || "\n");
    }
    linebreak(_node, entering) {
        if (!entering) {
            return;
        }
        this.tag('br', [], true);
        this.cr();
    }
    link(node, entering) {
        var attrs = this.attrs(node);
        if (entering) {
            if (node.destination == null) {
                throw new Error("destination cannot be null");
            }
            if (!(this.options.safe && potentiallyUnsafe(node.destination))) {
                attrs.push(['href', this.esc(node.destination, true)]);
            }
            if (node.title) {
                attrs.push(['title', this.esc(node.title, true)]);
            }
            this.tag('a', attrs);
        }
        else {
            this.tag('/a');
        }
    }
    image(node, entering) {
        if (entering) {
            if (this.disableTags === 0) {
                if (node.destination == null) {
                    throw new Error("destination cannot be null");
                }
                if (this.options.safe && potentiallyUnsafe(node.destination)) {
                    this.lit('<img src="" alt="');
                }
                else {
                    this.lit('<img src="' + this.esc(node.destination, true) +
                        '" alt="');
                }
            }
            this.disableTags += 1;
        }
        else {
            this.disableTags -= 1;
            if (this.disableTags === 0) {
                if (node.title) {
                    this.lit('" title="' + this.esc(node.title, true));
                }
                this.lit('" />');
            }
        }
    }
    emph(_node, entering) {
        this.tag(entering ? 'em' : '/em');
    }
    strong(_node, entering) {
        this.tag(entering ? 'strong' : '/strong');
    }
    paragraph(node, entering) {
        if (node.parent == null) {
            throw new Error("node.parent cannot be null");
        }
        var grandparent = node.parent.parent, attrs = this.attrs(node);
        if (grandparent !== null &&
            grandparent.type === 'list') {
            if (grandparent.listData.tight) {
                return;
            }
        }
        if (entering) {
            this.cr();
            this.tag('p', attrs);
        }
        else {
            this.tag('/p');
            this.cr();
        }
    }
    atx_heading(node, entering) {
        var tagname = 'h' + node.level, attrs = this.attrs(node);
        if (entering) {
            this.cr();
            this.tag(tagname, attrs);
        }
        else {
            this.tag('/' + tagname);
            this.cr();
        }
    }
    setext_heading(node, entering) {
        var tagname = 'h' + node.level, attrs = this.attrs(node);
        if (entering) {
            this.cr();
            this.tag(tagname, attrs);
        }
        else {
            this.tag('/' + tagname);
            this.cr();
        }
    }
    code(node, entering) {
        if (!entering) {
            return;
        }
        this.tag('code');
        this.out(node.literal);
        this.tag('/code');
    }
    indented_code_block(node, entering) {
        if (!entering) {
            return;
        }
        var info_words = node.info ? node.info.split(/\s+/) : [], attrs = this.attrs(node);
        if (info_words.length > 0 && info_words[0].length > 0) {
            attrs.push(['class', 'language-' + this.esc(info_words[0], true)]);
        }
        this.cr();
        this.tag('pre');
        this.tag('code', attrs);
        this.out(node.literal);
        this.tag('/code');
        this.tag('/pre');
        this.cr();
    }
    fenced_code_block(node, entering) {
        if (!entering) {
            return;
        }
        var info_words = node.info ? node.info.split(/\s+/) : [], attrs = this.attrs(node);
        if (info_words.length > 0 && info_words[0].length > 0) {
            attrs.push(['class', 'language-' + this.esc(info_words[0], true)]);
        }
        this.cr();
        this.tag('pre');
        this.tag('code', attrs);
        this.out(node.literal);
        this.tag('/code');
        this.tag('/pre');
        this.cr();
    }
    thematic_break(node, entering) {
        if (!entering) {
            return;
        }
        var attrs = this.attrs(node);
        this.cr();
        this.tag('hr', attrs, true);
        this.cr();
    }
    block_quote(node, entering) {
        var attrs = this.attrs(node);
        if (entering) {
            this.cr();
            this.tag('blockquote', attrs);
            this.cr();
        }
        else {
            this.cr();
            this.tag('/blockquote');
            this.cr();
        }
    }
    list(node, entering) {
        var tagname = node.listData.type === 'bullet' ? 'ul' : 'ol', attrs = this.attrs(node);
        if (entering) {
            var start = node.listData.start;
            if (start != null && start !== 1) {
                attrs.push(['start', start.toString()]);
            }
            this.cr();
            this.tag(tagname, attrs);
            this.cr();
        }
        else {
            this.cr();
            this.tag('/' + tagname);
            this.cr();
        }
    }
    item(node, entering) {
        var attrs = this.attrs(node);
        if (entering) {
            this.tag('li', attrs);
        }
        else {
            this.tag('/li');
            this.cr();
        }
    }
    html_inline(node, entering) {
        if (!entering) {
            return;
        }
        if (this.options.safe) {
            this.lit('<!-- raw HTML omitted -->');
        }
        else {
            this.lit(node.literal);
        }
    }
    html_block(node, entering) {
        if (!entering) {
            return;
        }
        this.cr();
        if (this.options.safe) {
            this.lit('<!-- raw HTML omitted -->');
        }
        else {
            this.lit(node.literal);
        }
        this.cr();
    }
    /*
         custom_inline(node:Node, entering:boolean) {
          if (entering && node.onEnter) {
            this.lit(node.onEnter);
          } else if (!entering && node.onExit) {
            this.lit(node.onExit);
          }
        }
    
         custom_block(node:Node, entering:boolean) {
          this.cr();
          if (entering && node.onEnter) {
            this.lit(node.onEnter);
          } else if (!entering && node.onExit) {
            this.lit(node.onExit);
          }
          this.cr();
        }
    */
    /* Helper methods */
    out(s) {
        if (s == null) {
            throw new Error("s cannot be null");
        }
        this.lit(this.esc(s, false));
    }
    attrs(node) {
        var att = [];
        if (this.options.sourcepos) {
            var pos = node.sourcepos;
            if (pos) {
                att.push(['data-sourcepos', String(pos[0][0]) + ':' +
                        String(pos[0][1]) + '-' + String(pos[1][0]) + ':' +
                        String(pos[1][1])]);
            }
        }
        return att;
    }
    get(str) {
        if (this[str] == null) {
            return null;
        }
        return this[str].bind(this);
    }
}
exports.HtmlRenderer = HtmlRenderer;
//# sourceMappingURL=html.js.map