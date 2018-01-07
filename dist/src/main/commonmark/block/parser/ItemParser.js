"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockParser_1 = require("./../../../BlockParser");
const util_1 = require("./../../../refactored/util");
const ListNode_1 = require("./../node/ListNode");
const ItemNode_1 = require("./../node/ItemNode");
var reBulletListMarker = /^[*+-]/;
var reOrderedListMarker = /^(\d{1,9})([.)])/;
// Parse a list marker and return data on the marker (type,
// start, delimiter, bullet character, padding) or undefined.
function parseListMarker(parser, node) {
    var rest = parser.currentLine.slice(parser.nextNonspace);
    var match;
    var nextc;
    var spacesStartCol;
    var spacesStartOffset;
    var data = {
        type: undefined,
        tight: true,
        bulletChar: undefined,
        start: undefined,
        delimiter: undefined,
        padding: undefined,
        markerOffset: parser.indent
    };
    if ((match = rest.match(reBulletListMarker))) {
        data.type = 'bullet';
        data.bulletChar = match[0][0];
    }
    else if ((match = rest.match(reOrderedListMarker)) &&
        (!parser.isParagraphNode(node) ||
            match[1] === '1')) {
        data.type = 'ordered';
        data.start = parseInt(match[1]);
        data.delimiter = match[2];
    }
    else {
        return undefined;
    }
    // make sure we have spaces after
    nextc = parser.currentLine[parser.nextNonspace + match[0].length];
    if (!(nextc == undefined || util_1.isSpaceOrTab(nextc))) {
        return undefined;
    }
    // if it interrupts paragraph, make sure first line isn't blank
    if (parser.isParagraphNode(node) && util_1.isBlank(parser.currentLine.slice(parser.nextNonspace + match[0].length))) {
        return undefined;
    }
    // we've got a match! advance offset and calculate padding
    parser.advanceNextNonspace(); // to start of marker
    parser.advanceOffset(match[0].length, true); // to end of marker
    spacesStartCol = parser.column;
    spacesStartOffset = parser.offset;
    do {
        parser.advanceOffset(1, true);
        nextc = parser.currentLine[parser.offset];
    } while (parser.column - spacesStartCol < 5 && util_1.isSpaceOrTab(nextc));
    var blank_item = (parser.currentLine[parser.offset] == undefined);
    var spaces_after_marker = parser.column - spacesStartCol;
    if (spaces_after_marker >= 5 ||
        spaces_after_marker < 1 ||
        blank_item) {
        data.padding = match[0].length + 1;
        parser.column = spacesStartCol;
        parser.offset = spacesStartOffset;
        if (util_1.isSpaceOrTab(parser.currentLine[parser.offset])) {
            parser.advanceOffset(1, true);
        }
    }
    else {
        data.padding = match[0].length + spaces_after_marker;
    }
    return Object.assign({}, data, { type: data.type, padding: data.padding });
}
;
// Returns true if the two list items are of the same type,
// with the same delimiter and bullet character.  This is used
// in agglomerating list items into lists.
function listsMatch(list_data, item_data) {
    return (list_data.type === item_data.type &&
        list_data.delimiter === item_data.delimiter &&
        list_data.bulletChar === item_data.bulletChar);
}
;
class ItemParser extends BlockParser_1.BlockParser {
    constructor(listParser, nodeCtor = ItemNode_1.ItemNode) {
        super(nodeCtor);
        this.acceptsLines = false;
        this.endsWithBlankLineIfLastChildEndsWithBlankLine = true;
        this.listParser = listParser;
    }
    tryStart(parser, node) {
        if (parser.indented && parser.getBlockParser(node) != this.listParser) {
            return false;
        }
        const data = parseListMarker(parser, node);
        if (data == undefined) {
            return false;
        }
        parser.closeUnmatchedBlocks();
        if (parser.tip == undefined) {
            throw new Error("parser.tip cannot be undefined");
        }
        // add the list if needed
        if (!(parser.tip instanceof ListNode_1.ListNode) ||
            !(node instanceof ListNode_1.ListNode) ||
            !listsMatch(node.listData, data)) {
            const listNode = parser.addChild(this.listParser, parser.nextNonspace);
            listNode.listData = data;
        }
        // add the list item
        const itemNode = parser.addChild(this, parser.nextNonspace);
        itemNode.listData = data;
        return true;
    }
    ;
    continue(parser, node) {
        if (parser.blank) {
            if (node.getFirstChild() == undefined) {
                // Blank line after empty list item
                return false;
            }
            else {
                parser.advanceNextNonspace();
            }
        }
        else if (node.listData.markerOffset != undefined &&
            node.listData.padding != undefined &&
            parser.indent >= (node.listData.markerOffset +
                node.listData.padding)) {
            parser.advanceOffset(node.listData.markerOffset +
                node.listData.padding, true);
        }
        else {
            return false;
        }
        return true;
    }
    ;
    finalize() { }
    canContain(_blockParser, node) {
        return !(node instanceof ItemNode_1.ItemNode);
    }
    canBeContainedBy(_blockParser, node) {
        return node instanceof ListNode_1.ListNode;
    }
    ignoreLastLineBlank(parser, node) {
        return (node.getFirstChild() == undefined &&
            node.sourceRange != undefined &&
            node.sourceRange.start.row === parser.lineNumber);
    }
}
exports.ItemParser = ItemParser;
//# sourceMappingURL=ItemParser.js.map