import { Node } from "../node";
import { BlockParserCollection } from "./BlockParserCollection";
export declare var CODE_INDENT: number;
export declare var isSpaceOrTab: (c: number) => boolean;
export declare var peek: (ln: string | null, pos: number) => number;
export declare var endsWithBlankLine: (blockParsers: BlockParserCollection<Node, Node>, block: Node | null) => boolean;
export declare var isBlank: (s: string | null) => boolean;
