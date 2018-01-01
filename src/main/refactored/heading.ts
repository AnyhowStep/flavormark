import {BlockParser} from "./BlockParser";
export const headingParser : BlockParser = {
    continue: function() {
        // a heading can never container > 1 line, so fail to match:
        return 1;
    },
    finalize: function() { return; },
    canContain: function() { return false; },
    acceptsLines: false
};
