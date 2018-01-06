import { BlockParser } from "../BlockParser";
export declare class DocumentParser extends BlockParser {
    continue(): boolean;
    finalize: () => void;
    canContain: () => boolean;
    acceptsLines: boolean;
}
export declare const documentParser: DocumentParser;
