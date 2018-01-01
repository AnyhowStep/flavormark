import {BlockParser} from "./BlockParser";
export const documentParser : BlockParser = {
    continue: function() { return true; },
    finalize: function() { return; },
    canContain: function(t:string) { return (t !== 'item'); },
    acceptsLines: false
};
