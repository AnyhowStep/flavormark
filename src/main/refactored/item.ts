import {BlockParser, BlockParserMeta, BlockNodeCtor} from "../BlockParser";
import {Parser} from "../Parser";
import {Node} from "../Node";
import {peek, isSpaceOrTab, isBlank} from "./util";

import {ListNode} from "./ListNode";
import {ItemNode} from "./ItemNode";

var reBulletListMarker = /^[*+-]/;

var reOrderedListMarker = /^(\d{1,9})([.)])/;

// Parse a list marker and return data on the marker (type,
// start, delimiter, bullet character, padding) or null.
var parseListMarker = function(parser : Parser, container : Node) :
{ type: string,
             tight: boolean,  // lists are tight by default
             bulletChar: string|null,
             start: number|null,
             delimiter: string|null,
             padding: number,
             markerOffset: number }|null
              {
    var rest = parser.currentLine.slice(parser.nextNonspace);
    var match;
    var nextc;
    var spacesStartCol;
    var spacesStartOffset;
    var data : { type: null|string,
                 tight: true,  // lists are tight by default
                 bulletChar: null|string,
                 start: null|number,
                 delimiter: null|string,
                 padding: null|number,
                 markerOffset: number }
     = { type: null,
                 tight: true,  // lists are tight by default
                 bulletChar: null,
                 start: null,
                 delimiter: null,
                 padding: null,
                 markerOffset: parser.indent };
    if ((match = rest.match(reBulletListMarker))) {
        data.type = 'bullet';
        data.bulletChar = match[0][0];

    } else if ((match = rest.match(reOrderedListMarker)) &&
                (!parser.isParagraphNode(container) ||
                 match[1] === '1')) {
        data.type = 'ordered';
        data.start = parseInt(match[1]);
        data.delimiter = match[2];
    } else {
        return null;
    }
    // make sure we have spaces after
    nextc = peek(parser.currentLine, parser.nextNonspace + match[0].length);
    if (!(nextc === -1 || isSpaceOrTab(nextc))) {
        return null;
    }

    // if it interrupts paragraph, make sure first line isn't blank
    if (parser.isParagraphNode(container) && isBlank(parser.currentLine.slice(parser.nextNonspace + match[0].length))) {
        return null;
    }

    // we've got a match! advance offset and calculate padding
    parser.advanceNextNonspace(); // to start of marker
    parser.advanceOffset(match[0].length, true); // to end of marker
    spacesStartCol = parser.column;
    spacesStartOffset = parser.offset;
    do {
        parser.advanceOffset(1, true);
        nextc = peek(parser.currentLine, parser.offset);
    } while (parser.column - spacesStartCol < 5 &&
           isSpaceOrTab(nextc));
    var blank_item = peek(parser.currentLine, parser.offset) === -1;
    var spaces_after_marker = parser.column - spacesStartCol;
    if (spaces_after_marker >= 5 ||
        spaces_after_marker < 1 ||
        blank_item) {
        data.padding = match[0].length + 1;
        parser.column = spacesStartCol;
        parser.offset = spacesStartOffset;
        if (isSpaceOrTab(peek(parser.currentLine, parser.offset))) {
            parser.advanceOffset(1, true);
        }
    } else {
        data.padding = match[0].length + spaces_after_marker;
    }
    return {
        ...data,
        type : data.type,
        padding : data.padding,
    };
};

// Returns true if the two list items are of the same type,
// with the same delimiter and bullet character.  This is used
// in agglomerating list items into lists.
var listsMatch = function(list_data : {
    type? : string|null,
    tight? : boolean|null,
    bulletChar? : string|null,
    start? : number|null,
    delimiter? : string|null,
    padding? : number|null,
    markerOffset? : number|null,
}, item_data : {
    type? : string|null,
    tight? : boolean|null,
    bulletChar? : string|null,
    start? : number|null,
    delimiter? : string|null,
    padding? : number|null,
    markerOffset? : number|null,
}) {
    return (list_data.type === item_data.type &&
            list_data.delimiter === item_data.delimiter &&
            list_data.bulletChar === item_data.bulletChar);
};

export class ItemParser extends BlockParser<ItemNode> {
    private listParser : BlockParser<ListNode>;
    public constructor (nodeType : string, nodeCtor : BlockNodeCtor<ItemNode>, listParser : BlockParser<ListNode>) {
        super(nodeType, nodeCtor);
        this.listParser = listParser;
    }
    tryStart= (parser : Parser, container : Node) => {
        var data;

        if ((!parser.indented || parser.getBlockParser(container) == (this.listParser as any))
                && (data = parseListMarker(parser, container))) {
            parser.closeUnmatchedBlocks();

            if (parser.tip == null) {
                throw new Error("parser.tip cannot be null");
            }

            // add the list if needed
            if (
                parser.getBlockParser(parser.tip) != (this.listParser  as any) ||
                !(container instanceof ListNode) ||
                !listsMatch(container.listData, data)
            ) {
                const listNode = parser.addChild<ListNode>(this.listParser, parser.nextNonspace);
                listNode.listData = data;
            }

            // add the list item
            const itemNode = parser.addChild<ItemNode>(this, parser.nextNonspace);
            itemNode.listData = data;
            return true;
        } else {
            return false;
        }
    };
    continue (parser : Parser, container : ItemNode) {
        if (parser.blank) {
            if (container.firstChild == null) {
                // Blank line after empty list item
                return false;
            } else {
                parser.advanceNextNonspace();
            }
        } else if (
            container.listData.markerOffset != null &&
            container.listData.padding != null &&
            parser.indent >=
                   container.listData.markerOffset +
                   container.listData.padding) {
            parser.advanceOffset(container.listData.markerOffset +
                container.listData.padding, true);
        } else {
            return false;
        }
        return true;
    };
    finalize= () => { return; };
    canContain= (blockParser : BlockParserMeta) : boolean => {
        return blockParser != this;
    };
    canBeContainedBy = (blockParser : BlockParserMeta) => {
        return blockParser == this.listParser;
    }
    acceptsLines = false;
    ignoreLastLineBlank= (parser : Parser, container : Node) => {
        return (
            container.firstChild == null &&
            container.sourcepos != null &&
            container.sourcepos[0][0] === parser.lineNumber
        );
    };
    endsWithBlankLineIfLastChildEndsWithBlankLine = true;
}

//import {listParser} from "./list";
//export const itemParser = new ItemParser("item", ItemNode, listParser);
