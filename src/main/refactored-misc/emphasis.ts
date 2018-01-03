import {Delimiter, DelimiterCollection, removeDelimitersBetween} from "./DelimiterCollection";
import {InlineNode} from "../refactored-inline/InlineNode";
import {Node} from "../node";

var C_ASTERISK = 42;
var C_UNDERSCORE = 95;
var C_SINGLEQUOTE = 39;
var C_DOUBLEQUOTE = 34;

export function processEmphasis(delimiters : DelimiterCollection, stack_bottom : Delimiter|null) {
    var opener, closer, old_closer;
    var opener_inl : Node|null, closer_inl : Node|null;
    var tempstack;
    var use_delims;
    var tmp, next;
    var opener_found;
    var openers_bottom = [];
    var odd_match = false;

    openers_bottom[C_UNDERSCORE] = stack_bottom;
    openers_bottom[C_ASTERISK] = stack_bottom;
    openers_bottom[C_SINGLEQUOTE] = stack_bottom;
    openers_bottom[C_DOUBLEQUOTE] = stack_bottom;

    // find first closer above stack_bottom:
    closer = delimiters.peek();
    while (closer !== null && closer.previous !== stack_bottom) {
        closer = closer.previous;
    }
    // move forward, looking for closers, and handling each
    while (closer !== null) {
        var closercc = closer.cc;
        if (!closer.can_close) {
            closer = closer.next;
        } else {
            // found emphasis closer. now look back for first matching opener:
            opener = closer.previous;
            opener_found = false;
            while (opener !== null && opener !== stack_bottom &&
                   opener !== openers_bottom[closercc]) {
                odd_match = (closer.can_open || opener.can_close) &&
                    (opener.origdelims + closer.origdelims) % 3 === 0;
                if (opener.cc === closer.cc && opener.can_open && !odd_match) {
                    opener_found = true;
                    break;
                }
                opener = opener.previous;
            }
            old_closer = closer;

            if (closercc === C_ASTERISK || closercc === C_UNDERSCORE) {
                if (!opener_found) {
                    closer = closer.next;
                } else {
                    if (opener == null) {
                        throw new Error("opener cannot be null");
                    }
                    // calculate actual number of delimiters used from closer
                    use_delims =
                      (closer.numdelims >= 2 && opener.numdelims >= 2) ? 2 : 1;

                    opener_inl = opener.node;
                    closer_inl = closer.node;

                    if (opener_inl == null) {
                        throw new Error("opener_inl cannot be null");
                    }
                    if (opener_inl.literal == null) {
                        throw new Error("opener_inl.literal cannot be null");
                    }
                    // remove used delimiters from stack elts and inlines
                    opener.numdelims -= use_delims;
                    closer.numdelims -= use_delims;
                    opener_inl.literal =
                        opener_inl.literal.slice(0,
                                                  opener_inl.literal.length - use_delims);

                    if (closer_inl.literal == null) {
                        throw new Error("closer_inl.literal cannot be null");
                    }
                    closer_inl.literal =
                        closer_inl.literal.slice(0,
                                                  closer_inl.literal.length - use_delims);

                    // build contents for new emph element
                    var emph = new InlineNode(use_delims === 1 ? 'emph' : 'strong');

                    tmp = opener_inl.next;
                    while (tmp && tmp !== closer_inl) {
                        next = tmp.next;
                        tmp.unlink();
                        emph.appendChild(tmp);
                        tmp = next;
                    }

                    opener_inl.insertAfter(emph);

                    // remove elts between opener and closer in delimiters stack
                    removeDelimitersBetween(opener, closer);

                    // if opener has 0 delims, remove it and the inline
                    if (opener.numdelims === 0) {
                        opener_inl.unlink();
                        delimiters.remove(opener);
                    }

                    if (closer.numdelims === 0) {
                        closer_inl.unlink();
                        tempstack = closer.next;
                        delimiters.remove(closer);
                        closer = tempstack;
                    }

                }

            } else if (closercc === C_SINGLEQUOTE) {
                closer.node.literal = "\u2019";
                if (opener_found) {
                    if (opener == null) {
                        throw new Error("opener cannot be null");
                    }
                    opener.node.literal = "\u2018";
                }
                closer = closer.next;

            } else if (closercc === C_DOUBLEQUOTE) {
                closer.node.literal = "\u201D";
                if (opener_found) {
                    if (opener == null) {
                        throw new Error("opener cannot be null");
                    }
                    opener.node.literal = "\u201C";
                }
                closer = closer.next;

            }
            if (!opener_found && !odd_match) {
                // Set lower bound for future searches for openers:
                // We don't do this with odd_match because a **
                // that doesn't match an earlier * might turn into
                // an opener, and the * might be matched by something
                // else.
                openers_bottom[closercc] = old_closer.previous;
                if (!old_closer.can_open) {
                    // We can remove a closer that can't be an opener,
                    // once we've seen there's no matching opener:
                    delimiters.remove(old_closer);
                }
            }
        }

    }

    // remove all delimiters
    while (delimiters.peek() !== null && delimiters.peek() !== stack_bottom) {
        delimiters.remove(delimiters.peek());
    }
};
