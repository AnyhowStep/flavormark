"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encode = require("mdurl/encode");
const decode = require("mdurl/decode");
var C_BACKSLASH = 92;
var decodeHTML = require('entities').decodeHTML;
exports.ENTITY = "&(?:#x[a-f0-9]{1,8}|#[0-9]{1,8}|[a-z][a-z0-9]{1,31});";
var TAGNAME = '[A-Za-z][A-Za-z0-9-]*';
var ATTRIBUTENAME = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
var UNQUOTEDVALUE = "[^\"'=<>`\\x00-\\x20]+";
var SINGLEQUOTEDVALUE = "'[^']*'";
var DOUBLEQUOTEDVALUE = '"[^"]*"';
var ATTRIBUTEVALUE = "(?:" + UNQUOTEDVALUE + "|" + SINGLEQUOTEDVALUE + "|" + DOUBLEQUOTEDVALUE + ")";
var ATTRIBUTEVALUESPEC = "(?:" + "\\s*=" + "\\s*" + ATTRIBUTEVALUE + ")";
var ATTRIBUTE = "(?:" + "\\s+" + ATTRIBUTENAME + ATTRIBUTEVALUESPEC + "?)";
exports.OPENTAG = "<" + TAGNAME + ATTRIBUTE + "*" + "\\s*/?>";
exports.CLOSETAG = "</" + TAGNAME + "\\s*[>]";
var HTMLCOMMENT = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->";
var PROCESSINGINSTRUCTION = "[<][?].*?[?][>]";
var DECLARATION = "<![A-Z]+" + "\\s+[^>]*>";
var CDATA = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
var HTMLTAG = "(?:" + exports.OPENTAG + "|" + exports.CLOSETAG + "|" + HTMLCOMMENT + "|" +
    PROCESSINGINSTRUCTION + "|" + DECLARATION + "|" + CDATA + ")";
exports.reHtmlTag = new RegExp('^' + HTMLTAG, 'i');
var reBackslashOrAmp = /[\\&]/;
exports.ESCAPABLE = '[!"#$%&\'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]';
var reEntityOrEscapedChar = new RegExp('\\\\' + exports.ESCAPABLE + '|' + exports.ENTITY, 'gi');
var XMLSPECIAL = '[&<>"]';
var reXmlSpecial = new RegExp(XMLSPECIAL, 'g');
var reXmlSpecialOrEntity = new RegExp(exports.ENTITY + '|' + XMLSPECIAL, 'gi');
var unescapeChar = function (s) {
    if (s.charCodeAt(0) === C_BACKSLASH) {
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
var replaceUnsafeChar = function (s) {
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