"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("../BlockParser");
const util_1 = require("./util");
const ListNode_1 = require("./ListNode");
var reBulletListMarker = /^[*+-]/;
var reOrderedListMarker = /^(\d{1,9})([.)])/;
// Parse a list marker and return data on the marker (type,
// start, delimiter, bullet character, padding) or null.
var parseListMarker = function (parser, container) {
    var rest = parser.currentLine.slice(parser.nextNonspace);
    var match;
    var nextc;
    var spacesStartCol;
    var spacesStartOffset;
    var data = { type: null,
        tight: true,
        bulletChar: null,
        start: null,
        delimiter: null,
        padding: null,
        markerOffset: parser.indent };
    if ((match = rest.match(reBulletListMarker))) {
        data.type = 'bullet';
        data.bulletChar = match[0][0];
    }
    else if ((match = rest.match(reOrderedListMarker)) &&
        (!parser.isParagraphNode(container) ||
            match[1] === '1')) {
        data.type = 'ordered';
        data.start = parseInt(match[1]);
        data.delimiter = match[2];
    }
    else {
        return null;
    }
    // make sure we have spaces after
    nextc = util_1.peek(parser.currentLine, parser.nextNonspace + match[0].length);
    if (!(nextc === -1 || util_1.isSpaceOrTab(nextc))) {
        return null;
    }
    // if it interrupts paragraph, make sure first line isn't blank
    if (parser.isParagraphNode(container) && util_1.isBlank(parser.currentLine.slice(parser.nextNonspace + match[0].length))) {
        return null;
    }
    // we've got a match! advance offset and calculate padding
    parser.advanceNextNonspace(); // to start of marker
    parser.advanceOffset(match[0].length, true); // to end of marker
    spacesStartCol = parser.column;
    spacesStartOffset = parser.offset;
    do {
        parser.advanceOffset(1, true);
        nextc = util_1.peek(parser.currentLine, parser.offset);
    } while (parser.column - spacesStartCol < 5 &&
        util_1.isSpaceOrTab(nextc));
    var blank_item = util_1.peek(parser.currentLine, parser.offset) === -1;
    var spaces_after_marker = parser.column - spacesStartCol;
    if (spaces_after_marker >= 5 ||
        spaces_after_marker < 1 ||
        blank_item) {
        data.padding = match[0].length + 1;
        parser.column = spacesStartCol;
        parser.offset = spacesStartOffset;
        if (util_1.isSpaceOrTab(util_1.peek(parser.currentLine, parser.offset))) {
            parser.advanceOffset(1, true);
        }
    }
    else {
        data.padding = match[0].length + spaces_after_marker;
    }
    return Object.assign({}, data, { type: data.type, padding: data.padding });
};
// Returns true if the two list items are of the same type,
// with the same delimiter and bullet character.  This is used
// in agglomerating list items into lists.
var listsMatch = function (list_data, item_data) {
    return (list_data.type === item_data.type &&
        list_data.delimiter === item_data.delimiter &&
        list_data.bulletChar === item_data.bulletChar);
};
class ItemParser extends BlockParser_1.BlockParser {
    constructor(nodeType, nodeCtor, listParser) {
        super(nodeType, nodeCtor);
        this.acceptsLines = false;
        this.endsWithBlankLineIfLastChildEndsWithBlankLine = true;
        this.listParser = listParser;
    }
    tryStart(parser, container) {
        var data;
        if ((!parser.indented || parser.getBlockParser(container) == this.listParser)
            && (data = parseListMarker(parser, container))) {
            parser.closeUnmatchedBlocks();
            if (parser.tip == null) {
                throw new Error("parser.tip cannot be null");
            }
            // add the list if needed
            if (parser.getBlockParser(parser.tip) != this.listParser ||
                !(container instanceof ListNode_1.ListNode) ||
                !listsMatch(container.listData, data)) {
                const listNode = parser.addChild(this.listParser, parser.nextNonspace);
                listNode.listData = data;
            }
            // add the list item
            const itemNode = parser.addChild(this, parser.nextNonspace);
            itemNode.listData = data;
            return true;
        }
        else {
            return false;
        }
    }
    ;
    continue(parser, container) {
        if (parser.blank) {
            if (container.firstChild == null) {
                // Blank line after empty list item
                return false;
            }
            else {
                parser.advanceNextNonspace();
            }
        }
        else if (container.listData.markerOffset != null &&
            container.listData.padding != null &&
            parser.indent >=
                container.listData.markerOffset +
                    container.listData.padding) {
            parser.advanceOffset(container.listData.markerOffset +
                container.listData.padding, true);
        }
        else {
            return false;
        }
        return true;
    }
    ;
    finalize() { }
    canContain(blockParser) {
        return blockParser != this;
    }
    ;
    canBeContainedBy(blockParser) {
        return blockParser == this.listParser;
    }
    ignoreLastLineBlank(parser, container) {
        return (container.firstChild == null &&
            container.sourcepos != null &&
            container.sourcepos[0][0] === parser.lineNumber);
    }
}
exports.ItemParser = ItemParser;
//import {listParser} from "./list";
//export const itemParser = new ItemParser("item", ItemNode, listParser);
//# sourceMappingURL=item.js.map