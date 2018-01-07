"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encode = require("mdurl/encode");
const decode = require("mdurl/decode");
const decodeHTML = require('entities').decodeHTML;
exports.ENTITY = "&(?:#x[a-f0-9]{1,8}|#[0-9]{1,8}|[a-z][a-z0-9]{1,31});";
const TAGNAME = '[A-Za-z][A-Za-z0-9-]*';
const ATTRIBUTENAME = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
const UNQUOTEDVALUE = "[^\"'=<>`\\x00-\\x20]+";
const SINGLEQUOTEDVALUE = "'[^']*'";
const DOUBLEQUOTEDVALUE = '"[^"]*"';
const ATTRIBUTEVALUE = "(?:" + UNQUOTEDVALUE + "|" + SINGLEQUOTEDVALUE + "|" + DOUBLEQUOTEDVALUE + ")";
const ATTRIBUTEVALUESPEC = "(?:" + "\\s*=" + "\\s*" + ATTRIBUTEVALUE + ")";
const ATTRIBUTE = "(?:" + "\\s+" + ATTRIBUTENAME + ATTRIBUTEVALUESPEC + "?)";
exports.OPENTAG = "<" + TAGNAME + ATTRIBUTE + "*" + "\\s*/?>";
exports.CLOSETAG = "</" + TAGNAME + "\\s*[>]";
const HTMLCOMMENT = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->";
const PROCESSINGINSTRUCTION = "[<][?].*?[?][>]";
const DECLARATION = "<![A-Z]+" + "\\s+[^>]*>";
const CDATA = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
const HTMLTAG = "(?:" + exports.OPENTAG + "|" + exports.CLOSETAG + "|" + HTMLCOMMENT + "|" +
    PROCESSINGINSTRUCTION + "|" + DECLARATION + "|" + CDATA + ")";
exports.reHtmlTag = new RegExp('^' + HTMLTAG, 'i');
const reBackslashOrAmp = /[\\&]/;
exports.ESCAPABLE = '[!"#$%&\'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]';
const reEntityOrEscapedChar = new RegExp('\\\\' + exports.ESCAPABLE + '|' + exports.ENTITY, 'gi');
const XMLSPECIAL = '[&<>"]';
const reXmlSpecial = new RegExp(XMLSPECIAL, 'g');
const reXmlSpecialOrEntity = new RegExp(exports.ENTITY + '|' + XMLSPECIAL, 'gi');
const unescapeChar = function (s) {
    if (s[0] == "\\") {
        return s.charAt(1);
    }
    else {
        return decodeHTML(s);
    }
};
// Replace entities and backslash escapes with literal characters.
exports.unescapeString = function (s) {
    if (reBackslashOrAmp.test(s)) {
        return s.replace(reEntityOrEscapedChar, unescapeChar);
    }
    else {
        return s;
    }
};
exports.normalizeURI = function (uri) {
    try {
        return encode(decode(uri));
    }
    catch (err) {
        return uri;
    }
};
const replaceUnsafeChar = function (s) {
    switch (s) {
        case '&':
            return '&amp;';
        case '<':
            return '&lt;';
        case '>':
            return '&gt;';
        case '"':
            return '&quot;';
        default:
            return s;
    }
};
exports.escapeXml = function (s, preserve_entities) {
    if (reXmlSpecial.test(s)) {
        if (preserve_entities) {
            return s.replace(reXmlSpecialOrEntity, replaceUnsafeChar);
        }
        else {
            return s.replace(reXmlSpecial, replaceUnsafeChar);
        }
    }
    else {
        return s;
    }
};
//# sourceMappingURL=common.js.map