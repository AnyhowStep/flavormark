import { BlockParser, BlockParserMeta } from "../BlockParser";
export declare class DocumentParser extends BlockParser {
    continue: () => boolean;
    finalize: () => void;
    canContain: (blockParser: BlockParserMeta) => boolean;
    acceptsLines: boolean;
}
export declare const documentParser: DocumentParser;
