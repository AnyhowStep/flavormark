import { Node } from "../Node";
import { BlockParserCollection } from "../BlockParserCollection";
export declare var isSpaceOrTab: (c: number) => boolean;
export declare var peek: (ln: string | undefined, pos: number) => number;
export declare var endsWithBlankLine: (blockParsers: BlockParserCollection<Node, Node>, block: Node | undefined) => boolean;
export declare var isBlank: (s: string | undefined) => boolean;
