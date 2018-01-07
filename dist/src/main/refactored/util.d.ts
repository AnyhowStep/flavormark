import { Node } from "../Node";
import { BlockParserCollection } from "../BlockParserCollection";
export declare function isSpaceOrTab(c: string): boolean;
export declare var endsWithBlankLine: (blockParsers: BlockParserCollection<Node, Node>, block: Node | undefined) => boolean;
export declare var isBlank: (s: string | undefined) => boolean;
